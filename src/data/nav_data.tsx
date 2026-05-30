export const menuData = [
  {
    category: "Art & Crafts",
    sections: [
      {
        title: "Painting, Drawing & Art Supplies",
        items: [
          "Art Paper",
          "Boards & Canvas",
          "Drawing",
          "Easels",
          "Painting",
        ],
      },
      {
        title: "Crafting",
        items: [
          "Basket Making",
          "Candle Making",
          "Ceramics & Pottery",
          "Craft Supplies",
          "Doll Making",
        ],
      },
      {
        title: "Fabric",
        items: [
          "Fabric Decorating",
          "Application Tools",
          "Dyes",
          "Fabric & Textile Paints",
          "Fabric Decorating Kits",
        ],
      },
      {
        title: "Beading & Jewelry Making",
        items: [
          "Beading Supplies",
          "Beads & Bead Assortments",
          "Charms",
          "Engraving Machines & Tools",
          "Fusible Glass Supplies",
        ],
      },
      {
        title: "Needlework",
        items: [
          "Cross-Stitch",
          "Embroidery",
          "Felt Applique Kits",
          "Latch Hook",
          "Needle Felting Supplies",
        ],
      },
      {
        title: "Knitting & Crochet",
        items: [
          "Ball Winders",
          "Crochet Hooks",
          "Crochet Kits",
          "Crochet Patterns",
          "Crochet Thread",
        ],
      },
      {
        title: "Printmaking",
        items: [
          "Etching Supplies",
          "Heat Press Machines & Accessories",
          "Printing Presses & Accessories",
          "Printmaking Inks",
          "Relief & Block Printing Materials",
        ],
      },
      {
        title: "Party Decorations & Supplies",
        items: [
          "Aisle Runners",
          "Balloons",
          "Banners & Garlands",
          "Card Boxes",
          "Cardboard Cutouts",
        ],
      },
      {
        title: "Organization, Storage & Transport",
        items: [
          "Art & Poster Tubes",
          "Art Tool & Sketch Boxes",
          "Beading Storage",
          "Craft & Sewing Supplies Storage",
          "Drying & Print Racks",
        ],
      },
    ],
  },
  {
    category: "Digital Content & Devices",
    sections: [
      {
        title: "Painting, Drawing & Art Supplies",
        items: [
          "Art Paper",
          "Boards & Canvas",
          "Drawing",
          "Easels",
          "Painting",
        ],
      },
    ],
  },
];

export const sidebarItems = [
  "Digital Content & Devices",
  "All Departments",
  "Art & Crafts",
  "Automotive",
  "Baby",
  "Beauty & Personal Care",
  "Books",
  "Computer",
  "Digital Music",
  "Electronics",
  "Kindle Store",
  "Prime Video",
  "Women's Fashion",
  "Men's Fashion",
  "Children's Clothing",
];


interface NavlinkProps {
  label: string;
  href: string;
}

export const navlinks: NavlinkProps[] = [
  { label: "Today's Deals",    href: "/deals" },
  { label: "Gift Cards",       href: "/gift-cards" },
  { label: "Sell",             href: "/sell" },
  { label: "Registry",         href: "/registry" },
  { label: "Customer Service", href: "/customer-service" },
];

import type { AccountMenu } from "@/types";

import {
  UserCircleIcon,
} from "@phosphor-icons/react";


export const unauthenticatedMenuItems: AccountMenu = {
  title: "Account",
  icon: (
    <UserCircleIcon
      size={18}
      weight="duotone"
    />
  ),

  items: [
    {
      label: "Sign In",
      href: "/auth/sign-in",
    },

    {
      label: "Create Account",
      href: "/auth/sign-up",
    },

    {
      label: "Continue as Guest",
      href: "/guest",
    },

    {
      label: "Become a Seller",
      href: "/sell",
    },
  ],
};

export const authenticatedMenuItems: AccountMenu = {
  title: "My Account",

  icon: (
    <UserCircleIcon
      size={18}
      weight="duotone"
    />
  ),

  items: [
    {
      label: "My Profile",
      href: "/account/profile",
    },

    {
      label: "Orders",
      href: "/account/orders",
    },

    {
      label: "Wishlist",
      href: "/account/wishlist",
    },

    {
      label: "Settings",
      href: "/account/settings",
    },

    {
      label: "Logout",
      href: "/logout",
    },
  ],
};