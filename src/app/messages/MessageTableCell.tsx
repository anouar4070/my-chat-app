import PresenceAvatar from "@/components/PresenceAvatar";
import { truncateString } from "@/lib/util";
import { MessageDto } from "@/types";
import { Button } from "@heroui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

type Props = {
  item: MessageDto;
  columnKey: string;
  isOutbox: boolean;
  deleteMessage: (message: MessageDto) => void;
  isDeleting: boolean;
};

// Function to render each cell based on the column type
export default function MessageTableCell({
  item,
  columnKey,
  isOutbox,
  deleteMessage,
  isDeleting,
}: Props) {
  const cellValue = item[columnKey as keyof MessageDto];

  switch (columnKey) {
    case "recipientName":
    case "senderName":
      return (
        <div className="flex items-center gap-2 cursor-pointer">
          <PresenceAvatar
            userId={isOutbox ? item.recipientId : item.senderId}
            src={isOutbox ? item.recipientImage : item.senderImage}
          />
          <span>{cellValue}</span>
        </div>
      );
    case "text":
      return <div>{truncateString(cellValue, 80)}</div>; // truncate long text
    case "created":
      return cellValue; // just show the date/time
    default:
      return (
        <Button
          isIconOnly
          variant="light"
          onPress={() => deleteMessage(item)}
          isLoading={isDeleting}
        >
          <AiFillDelete size={24} className="text-danger" />
        </Button>
      );
  }
}
