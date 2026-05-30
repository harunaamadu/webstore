"use client";

import { announcementItems } from "@/data/announcement_data";
import { AnnouncementDropdown } from "./AnnouncementDropdown";
import Link from "next/link";

export const AnnouncementItems = () => (
  <div className="flex items-center gap-1">
    {announcementItems.map((item) => (
      <AnnouncementDropdown key={item.select} item={item} />
    ))}

    <Link href={`tel:#`} target="_self" className="whitespace-nowrap!">
      <span className="font-semibold">Holtline:</span>+233 24 858 4525
    </Link>
  </div>
);
