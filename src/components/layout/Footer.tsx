"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
  YoutubeLogoIcon,
  TiktokLogoIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CaretUpIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { StaggerReveal } from "../animations/reveal";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOOTER_LINKS = [
  {
    heading: "Get to Know Us",
    links: [
      { label: "About Webstore", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press Releases", href: "/press" },
      { label: "Webstore Cares", href: "/cares" },
      { label: "Gift a Smile", href: "/gift" },
    ],
  },
  {
    heading: "Shop With Us",
    links: [
      { label: "Your Account", href: "/account" },
      { label: "Your Orders", href: "/account/orders" },
      { label: "Your Wishlist", href: "/account/wishlist" },
      { label: "Returns Centre", href: "/returns" },
      { label: "Track Your Order", href: "/track" },
    ],
  },
  {
    heading: "Make Money With Us",
    links: [
      { label: "Sell on Webstore", href: "/sell" },
      { label: "Become Affiliate", href: "/affiliate" },
      { label: "Advertise", href: "/advertise" },
      { label: "Self-Publish", href: "/publish" },
      { label: "Become a Vendor", href: "/vendor" },
    ],
  },
  {
    heading: "Let Us Help You",
    links: [
      { label: "Help Centre", href: "/help" },
      { label: "COVID-19 & Orders", href: "/covid" },
      { label: "Shipping Rates", href: "/shipping" },
      { label: "Returns Policy", href: "/returns-policy" },
      { label: "Privacy Notice", href: "/privacy" },
    ],
  },
];

const SOCIALS = [
  {
    icon: <FacebookLogoIcon size={16} weight="fill" />,
    href: "#",
    label: "Facebook",
  },
  {
    icon: <InstagramLogoIcon size={16} weight="fill" />,
    href: "#",
    label: "Instagram",
  },
  {
    icon: <TwitterLogoIcon size={16} weight="fill" />,
    href: "#",
    label: "Twitter",
  },
  {
    icon: <YoutubeLogoIcon size={16} weight="fill" />,
    href: "#",
    label: "YouTube",
  },
  {
    icon: <TiktokLogoIcon size={16} weight="fill" />,
    href: "#",
    label: "TikTok",
  },
];

const TRUST_BADGES = [
  {
    icon: <TruckIcon size={16} weight="duotone" />,
    label: "Free Shipping over $100",
  },
  {
    icon: <ShieldCheckIcon size={16} weight="duotone" />,
    label: "Secure Payments",
  },
  {
    icon: <CreditCardIcon size={16} weight="duotone" />,
    label: "Easy Returns",
  },
];

const PAYMENT_METHODS = ["VISA", "MC", "AMEX", "PayPal", "Apple Pay", "GPay"];

// ─── Collapsible column (mobile) ──────────────────────────────────────────────

const FooterColumn = ({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border md:border-none">
      {/* Mobile toggle */}
      <button
        className="flex w-full items-center justify-between py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground md:cursor-default md:pb-3 md:pt-0"
        onClick={() => setOpen((o) => !o)}
      >
        {heading}
        <CaretUpIcon
          size={13}
          weight="bold"
          className={cn(
            "transition-transform duration-200 md:hidden",
            open ? "rotate-0" : "rotate-180",
          )}
        />
      </button>

      {/* Links */}
      <ul
        className={cn(
          "flex flex-col gap-2.5 overflow-hidden pb-4 md:flex md:max-h-none md:pb-0",
          open ? "max-h-96" : "max-h-0 pb-0 md:pb-0",
        )}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => {
  return (
    <StaggerReveal
      stagger={0.08}
      variant="blur"
      direction="up"
      as="div"
      itemAs="footer"
      className="w-full border-t border-border bg-muted/20"
    >
      {/* Trust badges */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto flex w-full max-w-360 flex-wrap items-center justify-center gap-6 px-4 py-4 md:justify-start md:gap-10 md:px-8">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2">
              <span className="text-primary">{badge.icon}</span>
              <span className="text-xs font-medium text-muted-foreground">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main link columns */}
      <div className="mx-auto w-full max-w-360 px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-4 md:gap-8">
          {FOOTER_LINKS.map((col) => (
            <FooterColumn
              key={col.heading}
              heading={col.heading}
              links={col.links}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Bottom bar */}
      <div className="mx-auto w-full max-w-360 px-4 py-6 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left — logo + contact */}
          <div className="flex flex-col gap-3">
            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-xl font-semibold uppercase tracking-tight"
            >
              web<span className="text-primary">store</span>
            </Link>

            <div className="flex flex-col gap-1.5">
              <a
                href="tel:+233248584525"
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <PhoneIcon size={12} />
                +233 24 858 4525
              </a>
              <a
                href="mailto:support@webstore.com"
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <EnvelopeIcon size={12} />
                support@webstore.com
              </a>
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPinIcon size={12} />
                Accra, Ghana · Available worldwide
              </p>
            </div>
          </div>

          {/* Center — socials + payment */}
          <div className="flex flex-col gap-4">
            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-7 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Payment methods */}
            <div className="flex flex-wrap items-center gap-1.5">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="border border-border bg-background px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Right — app download CTA */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Shop on the go
            </p>
            <Link
              href="#"
              className="group flex items-center gap-2 border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Download our app
              <ArrowRightIcon
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="#"
              className="group flex items-center gap-2 border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Become a seller
              <ArrowRightIcon
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5">
          <p className="text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} Webstore. All rights reserved.
          </p>
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Use", href: "/terms" },
            { label: "Cookie Notice", href: "/cookies" },
            { label: "Accessibility", href: "/accessibility" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[10px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </StaggerReveal>
  );
};

export default Footer;
