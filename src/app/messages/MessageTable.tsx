"use client";

import { MessageDto } from "@/types";
import { Card } from "@heroui/card";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, //getKeyValue,
} from "@heroui/table";
import MessageTableCell from "./MessageTableCell";
import { useMessages } from "@/hooks/useMessages";

type Props = {
  initialMessages: MessageDto[];
};

export default function MessageTable({ initialMessages }: Props) {
  const { isOutbox, columns, deleteMessage, selectRow, isDeleting, messages } = useMessages(initialMessages);

  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
      <Table
        aria-label="Message"
        selectionMode="single"
        onRowAction={(key) => selectRow(key)} // handle row click
        shadow="none"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              width={column.key === "text" ? "50%" : undefined}
            >
              {column.label}
            </TableColumn> // render table header
          )}
        </TableHeader>
        <TableBody items={messages}>
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell
                  className={`${
                    !item.dateRead && !isOutbox ? "font-semibold" : ""
                  }`}
                >
                  <MessageTableCell
                    item={item}
                    columnKey={columnKey as string}
                    isOutbox={isOutbox}
                    deleteMessage={deleteMessage}
                    isDeleting={isDeleting.loading && isDeleting.id === item.id}
                  />{" "}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
