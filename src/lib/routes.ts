
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";

export const navItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Orders", icon: ShoppingCart, href: "/orders" },
  {
    name: "Products",
    icon: Package,
    href: "/products",
    subItems: [
      { name: "All Products", href: "/products" },
      { name: "Add Product", href: "/products/new" },
    ],
  },
  { name: "Customers", icon: Users, href: "/customers" },
  { name: "Analytics", icon: LineChart, href: "/analytics" },
];
