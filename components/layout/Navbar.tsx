"use client";
import React, { useState } from "react";
import { ModeToggle } from "../theme/ModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";

type navLink = {
  title: string;
  href: string;
};

const NavLinks: navLink[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Snippets",
    href: "/snippets",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Projects",
    href: "/projects",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="mx-auto flex h-23 w-full max-w-4xl items-center justify-between px-5">
      <ModeToggle />
      <div className="hidden w-[25rem] items-center justify-center gap-5 rounded-full border-[1px] py-1 shadow-2xs md:flex">
        {NavLinks.map((itm, idx) => (
          <Link className="relative" key={idx} href={itm.href}>
            <span
              className={cn(
                "text-sm font-semibold",
                pathname === itm.href && "text-teal-600",
              )}
            >
              {itm.title}
            </span>
          </Link>
        ))}
      </div>
      <MobileNav />
    </nav>
  );
};

export default Navbar;

const MobileNav = () => {
  const [isActive, setActive] = useState<boolean>(false);
  return (
    <>
      <div className="-mt-1 flex w-full items-center justify-end gap-3 text-sm md:hidden">
        <Link href={"/"}>Home</Link>
        <Link href={"/projects"}>Projects</Link>
        <button onClick={() => setActive(!isActive)} className="z-50">
          {isActive ? (
            <IconX className="cursor-pointer" />
          ) : (
            <IconMenu2 className="cursor-pointer" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {isActive && <Menu />}
      </AnimatePresence>
    </>
  );
};

const Menu = () => {
  const pathname = usePathname();
  return (
    <motion.div
      initial={{
        height: "0vh",
      }}
      animate={{
        height: "100vh",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      exit={{
        height: "0vh",
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      className="fixed left-0 top-0 z-10 w-screen overflow-hidden bg-background px-5 pt-10 text-primary backdrop-blur-sm"
    >
      {NavLinks.map((itm, idx) => (
        <div key={idx} className="mt-3">
          <Link className="relative" href={itm.href}>
            <span
              className={cn(
                "text-xl font-semibold",
                pathname === itm.href && "text-teal-600",
              )}
            >
              {itm.title}
            </span>
          </Link>
        </div>
      ))}
    </motion.div>
  );
};