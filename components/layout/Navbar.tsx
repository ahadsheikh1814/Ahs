"use client";
import React, { useState } from "react";
import { ModeToggle } from "../theme/ModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { IconMenu2, IconX, IconCommand } from "@tabler/icons-react";
import CommandMenu from "./command-menu";

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
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "AI",
    href: "/ai",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isHovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScroll] = useState<boolean>(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  });

  return (
    <>
      <motion.nav
        animate={{
          height: scrolled ? "64px" : "",
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="bg-background/10 sticky top-0 z-20 mx-auto flex h-23 w-full max-w-4xl items-center justify-between px-2 backdrop-blur-sm md:px-5"
      >
        <div className="flex items-center gap-1">
          <ModeToggle />
          <div className="hidden items-center md:flex">
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center justify-center"
            >
              <IconCommand className="text-primary/70 h-5 w-5 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="hidden w-[25rem] items-center justify-center rounded-full py-1 md:flex">
          {NavLinks.map((itm, idx) => (
            <Link
              className="relative px-2 py-1 text-sm"
              key={idx}
              href={itm.href}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className={cn(
                  "z-10 text-sm font-semibold",
                  "transition-colors duration-75",
                  pathname === itm.href &&
                    "z-10 text-teal-600 hover:text-teal-500",
                )}
              >
                {itm.title}
              </span>
              {isHovered === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className={
                    "bg-accent absolute inset-0 -z-10 h-full w-full rounded-md"
                  }
                />
              )}
            </Link>
          ))}
        </div>
        <MobileNav setCommandOpen={setCommandOpen} />
      </motion.nav>
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </>
  );
};

export default Navbar;

const MobileNav = ({
  setCommandOpen,
}: {
  setCommandOpen: (value: boolean) => void;
}) => {
  const [isActive, setActive] = useState<boolean>(false);

  return (
    <>
      <div className="-mt-1 flex w-full items-center justify-end gap-3 text-sm md:hidden">
        <Link href={"/"}>Home</Link>
        <Link href={"/projects"}>Projects</Link>
        <Link href={"/ai"}>AI</Link>
        <button
          onClick={() => setCommandOpen(true)}
          className="flex items-center justify-center"
        >
          <IconCommand className="h-5 w-5 cursor-pointer" />
        </button>
        <button onClick={() => setActive(!isActive)} className="z-50">
          {isActive ? (
            <IconX className="cursor-pointer" />
          ) : (
            <IconMenu2 className="cursor-pointer" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {isActive && <Menu isActive setActive={setActive} />}
      </AnimatePresence>
    </>
  );
};

const Menu = ({
  setActive,
}: {
  isActive: boolean;
  setActive: (value: boolean) => void;
}) => {
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
      className="bg-background text-primary fixed top-0 left-0 z-10 w-screen overflow-hidden px-5 pt-10 backdrop-blur-sm"
    >
      {NavLinks.map((itm, idx) => (
        <div key={idx} className="mt-3">
          <Link
            className="relative"
            href={itm.href}
            onClick={() => setActive(false)}
          >
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
