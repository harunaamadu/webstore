"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Reveal } from "../animations/reveal";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbTitleProps = {
  eyebrow?: string;
  title: string;
  crumbs?: Crumb[];
  link?: {
    href: string;
    label: string;
  };
  className?: string;
};

const BreadcrumbTitle = ({
  eyebrow,
  title,
  crumbs = [],
  link,
  className,
}: BreadcrumbTitleProps) => {
  return (
    <Reveal variant="slide" direction="up">
      <div className={cn("mb-6 space-y-3 mx-auto w-full", className)}>
        {/* Breadcrumb */}
        {crumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;

                return (
                  <div key={index} className="flex items-center">
                    <BreadcrumbItem>
                      {isLast || !crumb.href ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={crumb.href}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>

                    {!isLast && <BreadcrumbSeparator />}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Title Row */}
        <div className="flex w-full items-center justify-between gap-4">
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
      </div>
    </Reveal>
  );
};

export default BreadcrumbTitle;