"use client";

import { usePathname } from "next/navigation";
// import NavBar from "./global/Navbar";
// import Footer from "./global/Footer";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/accept-invite",
];


const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute) {
    return children;
  } else {
    return (
      <div className="bg-background w-full">
        {/* <NavBar /> */}
        {children}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default LayoutWrapper

