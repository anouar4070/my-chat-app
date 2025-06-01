"use client";

import { MessageDto } from "@/types";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Avatar } from "@heroui/react";
import { timeAgo, transformImageUrl } from "@/lib/util";

type Props = {
  message: MessageDto;
  currentUserId: string;
};

export default function MessageBox({ message, currentUserId }: Props) {
  const isCurrentUserSender = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(messageEndRef.current) messageEndRef.current.scrollIntoView({behavior: 'smooth'})
  }, [messageEndRef])
  

  const renderAvatar = () => (
    <Avatar
      name={message.senderName}
      className="self-end"
      src={transformImageUrl(message.senderImage) || "/images/user.png"}
    />
  );

  const messageContentClasses = clsx("flex flex-col w-[50%] px-2 py-1", {
    "rounded-l-xl rounded-tr-xl text-white bg-blue-100": isCurrentUserSender,
    "rounded-r-xl rounded-tl-xl border-gray-200 bg-green-100":
      !isCurrentUserSender,
  });

 const renderMessageHeader = () =>  (
      <div className={clsx('flex items-center w-full', {
        'justify-between': isCurrentUserSender
      })}>
   {message.dateRead && message.recipientId !== currentUserId ? (
    <span className="text-xs text-black text-italic">(Read {timeAgo(message.dateRead)})</span>
   ) : <div></div>}
   <div className="flex">
    <span className="text-sm font-semibold text-gray-900">{message.senderName}</span>
    <span className="text-sm text-gray-500 ml-2">{message.created}</span>
   </div>
      </div>
    );
  

  const renderMessageContent = () => {
    return (
      <div className={messageContentClasses}>
        {renderMessageHeader()}
        <p className="text-sm py-3 text-gray-900">{message.text}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
}



/**
 * explanation

✅ Base:  <div className="flex items-center w-full">
→ This container uses flexbox, which lets its child elements be aligned horizontally.

✅ If you are the sender (isCurrentUserSender === true):
Then we add justify-between.
That means:
→ The first child (the (Read …) block or the empty <div>) goes all the way to the left
→ The second child (the block with senderName + created) goes all the way to the right
Result:
The name and time of your own message are aligned to the right.

✅ If the other person sent the message (isCurrentUserSender === false):
Then we don’t add justify-between.
By default, flexbox aligns the elements to the left
→ So the name and time stay aligned on the left.
 */