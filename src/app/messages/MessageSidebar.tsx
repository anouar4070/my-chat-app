"use client";

import { Chip } from "@heroui/react";
import clsx from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";

export default function MessageSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string>(
    searchParams.get("container") || "inbox"
  );

  const items = [
    { key: "inbox", label: "Inbox", icon: GoInbox, chip: true },
    { key: "outbox", label: "Outbox", icon: MdOutlineOutbox, chip: false },
  ];

  const handleSelect = (key: string) => {
    setSelected(key);
    const params = new URLSearchParams();
    params.set("container", key);
    router.replace(`${pathname}?${params}`);
  };
  /**
   http://localhost:3001/messages?container=inbox
   http://localhost:3001/messages?container=outbox
   */

  return (
    <div className="flex flex-col shadow-md rounded-lg cursor-pointer">
      {items.map(({ key, icon: Icon, label, chip }) => (
        <div
          key={key}
          className={clsx("flex flex-row items-center rounded-t-lg gap-2 p-3", {
            "text-secondary font-semibold": selected === key,
            "text-black hover:text-secondary/70": selected !== key,
          })}
          onClick={() => handleSelect(key)}
        >
          <Icon size={24} />
          <div className="flex justify-between flex-grow">
            <span>{label}</span>
            {chip && <Chip>5</Chip>}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 ☝
  ✅ useSearchParams() comes from React Router (v6+).
It gives you a special object (kind of like URLSearchParams) that lets you read the URL query parameters after the ?.

For example, if your URL is:
http://localhost:3000/messages?container=sent
Then:
searchParams.get("container") will return "sent".

✌
✅ router.replace(...) → this updates the URL without reloading the page.
So effectively:
router.replace(`${pathname}?${params}`);
// becomes something like:
router.replace(`/messages?container=inbox`);
BUT — where does pathname come from?
That depends on what framework or router you’re using.

For example:
In Next.js → you usually get it from usePathname() or router.pathname.
In React Router → you can get it from useLocation().pathname.
 */
