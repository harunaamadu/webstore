"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { LayoutIcon, XIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useMegaMenu } from "./MegaMenuContext";

const MegaMenuTrigger = () => {
  const { open, toggle, triggerRef } = useMegaMenu();

  return (
    <div ref={triggerRef}>
      <Button
        variant="ghost"
        size="lg"
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex-col lg:flex-row gap-2 px-4 font-medium"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center"
        >
          {open ? <XIcon size={20} /> : <LayoutIcon size={20} />}
        </motion.span>
        All
      </Button>
    </div>
  );
};

export default memo(MegaMenuTrigger);