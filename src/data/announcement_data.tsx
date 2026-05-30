import {
  MapPin,
  CityIcon,
  GlobeIcon,
  TranslateIcon,
  CurrencyDollar,
  CurrencyDollarIcon,
  CurrencyEurIcon,
  CurrencyGbpIcon,
  CurrencyJpyIcon,
} from "@phosphor-icons/react"
import type { AnnouncementItem, AnnouncementProps } from "@/types"

export const announcementArray: AnnouncementProps[] = [
  {
    text: "24/7 Webstore customer service",
    highlight: "24/7",
    href: "#",
  },
  {
    text: "Upto 10% discount on items above $500",
    highlight: ["10%", "$500"],
    href: "#",
  },
  {
    text: "Free shipping on all orders over $100",
    highlight: "$100",
    href: "#",
  },
]

export const announcementItems: AnnouncementItem[] = [
  {
    select: "Accra",
    selectIcon: <MapPin weight="fill" size={12} />,
    options: [
      { label: "Accra",  icon: <CityIcon size={12} /> },
      { label: "New York",  icon: <CityIcon size={12} /> },
      { label: "London",    icon: <CityIcon size={12} /> },
      { label: "Abu Dhabi", icon: <CityIcon size={12} /> },
    ],
  },
  {
    select: "ENG",
    selectIcon: <GlobeIcon weight="fill" size={12} />,
    options: [
      { label: "English", icon: <TranslateIcon size={12} /> },
      { label: "French",  icon: <TranslateIcon size={12} /> },
      { label: "Español", icon: <TranslateIcon size={12} /> },
      { label: "Arabic",  icon: <TranslateIcon size={12} /> },
      { label: "Chinese", icon: <TranslateIcon size={12} /> },
    ],
  },
  {
    select: "USD",
    selectIcon: <CurrencyDollar weight="fill" size={12} />,
    options: [
      { label: "USD — US Dollar",       icon: <CurrencyDollarIcon size={12} /> },
      { label: "EUR — Euro",            icon: <CurrencyEurIcon size={12} /> },
      { label: "GBP — Pounds Sterling", icon: <CurrencyGbpIcon size={12} /> },
      { label: "JPY — Japanese Yen",    icon: <CurrencyJpyIcon size={12} /> },
    ],
  },
]