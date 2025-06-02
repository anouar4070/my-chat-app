import { auth } from "@/auth";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.formData();

        // Extract socket_id and channel_name from the request body
    const socketId = body.get("socket_id") as string;
    const channel = body.get("channel_name") as string;

    // Prepare extra data to send with the authorization (e.g., user_id)
    const data = {
      user_id: session.user.id,
    };

    // Authorize the channel using Pusher server-side library
    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

    return NextResponse.json(authResponse);
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
