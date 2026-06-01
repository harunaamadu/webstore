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
      href: "/sign-in",
    },

    {
      label: "Create Account",
      href: "/register",
    },

    {
      label: "Continue as Guest",
      href: "/guest-account",
    },

    {
      label: "Become a Seller",
      href: "/sign-in?role=seller",
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

export const guestMenuItems = {
  items: [
    {
      label: "Continue Shopping",
      href: "/shop",
    },
    {
      label: "Cart",
      href: "/cart",
    },
    {
      label: "Create Account",
      href: "/register",
    },
    {
      label: "Sign In",
      href: "/signin",
    },
  ],
};

// data/nav_data.ts

export const sellerMenuItems = {
  items: [
    {
      label: "Seller Dashboard",
      href: "/seller/dashboard",
      description:
        "Overview of sales, orders and store performance",
    },
    {
      label: "Products",
      href: "/seller/products",
      description:
        "Manage your products and inventory",
    },
    {
      label: "Add Product",
      href: "/seller/products/new",
      description:
        "Create and publish a new product",
    },
    {
      label: "Orders",
      href: "/seller/orders",
      description:
        "View and manage customer orders",
    },
    {
      label: "Customers",
      href: "/seller/customers",
      description:
        "Manage customer relationships",
    },
    {
      label: "Analytics",
      href: "/seller/analytics",
      description:
        "Track sales, revenue and store growth",
    },
    {
      label: "Store Settings",
      href: "/seller/store",
      description:
        "Customize your storefront and branding",
    },
    {
      label: "Payouts",
      href: "/seller/payouts",
      description:
        "View earnings and withdrawal history",
    },
    {
      label: "Coupons",
      href: "/seller/coupons",
      description:
        "Create and manage discount campaigns",
    },
    {
      label: "Reviews",
      href: "/seller/reviews",
      description:
        "Monitor customer ratings and feedback",
    },
    {
      label: "Support",
      href: "/seller/support",
      description:
        "Get help with your seller account",
    },
    {
      label: "Account Settings",
      href: "/account/settings",
      description:
        "Manage profile and security settings",
    },
    {
      label: "Sign Out",
      href: "/api/auth/signout",
      danger: true,
    },
  ],
};