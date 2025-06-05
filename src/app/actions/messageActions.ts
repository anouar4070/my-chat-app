"use server";

import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult, MessageDto } from "@/types";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib/mappings";
import { pusherServer } from "@/lib/pusher";
import { createChatId } from "@/lib/util";

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success)
      return { status: "error", error: validated.error.errors };

    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
      select: messageSelect,
    });

    const messageDto = mapMessageToMessageDto(message);

    await pusherServer.trigger(
      createChatId(userId, recipientUserId), // → channel name
      "message:new", // → event name
      messageDto // → payload (the message data)
    );

    await pusherServer.trigger(
      `private-${recipientUserId}`, // → private channel name
      "message:new", // → event name
      messageDto // → payload (the message data)
    );

    return { status: "success", data: messageDto };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: messageSelect,
    });

    let readCount = 0;

    if (messages.length > 0) {
      const readMessageIds = messages
        .filter(
          (m) =>
            m.dateRead === null &&
            m.recipient?.userId === userId &&
            m.sender?.userId === recipientId
        )
        .map((m) => m.id); // [{ id: 1, ... }, { id: 7, ... }]  ==>  [1, 7]

      await prisma.message.updateMany({
        where: { id: { in: readMessageIds } },
        data: { dateRead: new Date() },
      });

      readCount = readMessageIds.length;

      await pusherServer.trigger(
        createChatId(recipientId, userId),
        "messages:read",
        readMessageIds
      );
    }
    const messagesToReturn = messages.map((message) => mapMessageToMessageDto(message))
    return {messages: messagesToReturn, readCount}
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMessagesByContainer(container: string) {
  try {
    const userId = await getAuthUserId();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };
    /**
{
  senderId: userId,          // if outbox
  senderDeleted: false       // if outbox
}
  --OR--
{
  recipientId: userId,       // if inbox
  recipientDeleted: false    // if inbox
}
     */

    const messages = await prisma.message.findMany({
      where: conditions,

      orderBy: {
        created: "desc",
      },
      select: messageSelect,
    });

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";
  try {
    const userId = await getAuthUserId();

    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    // If there are any messages that need to be permanently deleted
    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          // Delete messages where the id matches ANY of the message IDs in the list
          // This builds a WHERE clause like:
          // WHERE id = id1 OR id = id2 OR id = id3 ...
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUnreadMessageCount() {
  try {
    const userId = await getAuthUserId();

    return await prisma.message.count({
      where: {
        recipientId: userId,
        dateRead: null,
        recipientDeleted: false,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const messageSelect = {
  id: true,
  text: true,
  created: true,
  dateRead: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};

/**
 🌟 Why use mapMessageToMessageDto()?

message → the raw database object (from Prisma), often containing extra or sensitive data (like internal IDs, timestamps, nested relations).

messageDto → a cleaned, formatted version specifically prepared for the frontend, sent via Pusher.

This Data Transfer Object (DTO) helps:
✅ Avoid exposing unnecessary or sensitive data.
✅ Provide a clear and stable structure for the frontend.
✅ Adapt or enrich data (e.g., format dates, add computed fields).
 */
