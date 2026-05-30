import type { ReactNode } from "react"

export * from "./product"

export type AnnouncementOption = {
  label: string
  icon: ReactNode
}

export type AnnouncementItem = {
  select: string
  selectIcon: ReactNode
  options: AnnouncementOption[]
}

export type AnnouncementProps = {
  text: string
  highlight: string | string[]
  href: string
}

export type AccountMenuItem = {
  label: string;
  href: string;
}

export type AccountMenu = {
  title: string;
  icon: ReactNode;
  items: AccountMenuItem[];
}