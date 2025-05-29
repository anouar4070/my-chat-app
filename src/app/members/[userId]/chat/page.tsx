import CardInnerWrapper from "@/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";

export default async function ChatPage({params}: {params: Promise<{userId: string}>}) {
  const {userId} = await params;
  const messages = await getMessageThread(userId)
  console.log({messages})
//   {
//   messages: [
//     {
//       id: 'cmb6zpipt0001ukx8g848v810',
//       text: 'qq',
//       created: 2025-05-27T20:49:49.996Z,
//       dateRead: null,
//       sender: [Object],
//       recipient: [Object]
//     }
//   ]
// }
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>Chat goes here</div>}
      footer={<ChatForm />}
    />
  );
}


/**
  The page.tsx is inside a dynamic route folder (e.g., /members/[userId]/chat), Next.js automatically passes a params object to the page component. This object contains the dynamic segments of the URL.
 */