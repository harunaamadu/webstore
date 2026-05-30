"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

import { Reveal } from "../animations/reveal";
import { cn } from "@/lib/utils";

type LinkProps = {
  href: string;
  label: string;
};

type TitleProps = {
  eyebrow?: string;
  title: string;
  link?: LinkProps;
  className?: string;
};

const SectionTitle = ({
  eyebrow,
  title,
  link,
  className,
}: TitleProps) => {
  return (
    <Reveal variant="slide" direction="up">
      <div
        className={cn(
          "mb-6 flex w-full items-center justify-between gap-4",
          className
        )}
      >
        <div>
          {eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {eyebrow}
            </p>
          )}

          <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
        </div>

        {link && (
          <Link
            href={link.href}
            className="group hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            {link.label}

            <ArrowRightIcon
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
    </Reveal>
  );
};

export default SectionTitle;