"use client";

import { AnnouncementCarousel } from "./AnnouncementCarousel";
import { AnnouncementItems } from "./AnnouncementItems";
import { motion } from "framer-motion";

export const Announcement = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="
      hidden md:flex items-center justify-between gap-4 md:gap-12
      w-full max-w-360 mx-auto
      px-6 md:px-8 py-0
      bg-neutral-200 text-neutral-600
      font-normal text-xs
      min-h-8
    "
  >
    <AnnouncementCarousel />
    <AnnouncementItems />
  </motion.div>
);

export default Announcement;
