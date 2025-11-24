import type { NavLink, NavbarCTA } from "../types/navbarData";

export const navbarLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Feature", href: "/feature" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blogs", target: "_blank" },
  { name: "Employers", href: "/employers", target: "_blank" },
];

export const navbarCTAs: NavbarCTA = {
  primary: { label: "Talk to an Expert →", href: "/talk-to-an-expert" },
  secondary: { label: "See Flashfire in Action →", href: "/see-flashfire-in-action" },
};
