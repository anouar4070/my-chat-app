import CardInnerWrapper from "@/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { getAuthUserId } from "@/app/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/lib/util";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const currentUserId = await getAuthUserId();
  const messages = await getMessageThread(userId);
  const chatId = createChatId(currentUserId, userId)

  /**    console.log({messages})
 *{
  messages: [
    {
      id: 'cmb6zpipt0001ukx8g848v810',
      text: 'qq',
      created: '27 May 25 10:49:PM',
      dateRead: null,
      senderId: 'cmay2dnf80003uk0w4kth1g3g',
      senderName: 'Lisa',
      senderImage: '/images/f1.jpeg',
      recipientId: 'cmay2dnfy0009uk0wb3ioexyk',
      recipientName: 'Porter',
      recipientImage: '/images/m2.jpeg'
    }
  ]
}
 */
  return (
    <CardInnerWrapper
      header="Chat"
      body={<MessageList initialMessages={messages} currentUserId={currentUserId} chatId={chatId} />}
      footer={<ChatForm />}
    />
  );
}

/**
  The page.tsx is inside a dynamic route folder (e.g., /members/[userId]/chat), Next.js automatically passes a params object to the page component. This object contains the dynamic segments of the URL.
 */
