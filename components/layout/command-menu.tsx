"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTheme } from "next-themes";
import {
  IconBrandBlogger,
  IconFolderCog,
  IconHome,
  IconMail,
  IconSearch,
  IconTools,
  IconMoon,
  IconSun,
  IconUser,
  IconBrandGithub,
  IconBrandX,
  IconRobotFace,
} from "@tabler/icons-react";
import Image from "next/image";
import type { Icon as TablerIcon } from "@tabler/icons-react";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface MenuItem {
  label: string;
  icon: TablerIcon;
  action: () => void;
  customIcon?: {
    src: string;
    alt: string;
  };
}

interface ThemeOption {
  label: string;
  icon: TablerIcon;
  value: "light" | "dark";
}

export default function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const handleSelect = (callback: () => void) => {
    callback();
    setOpen(false);
  };

  // Define social links
  const socialLinks: MenuItem[] = [
    {
      label: "GitHub",
      icon: IconBrandGithub,
      action: () => router.push("https://github.com/ahadsheikh1814"),
    },
    {
      label: "X.com",
      icon: IconBrandX,
      action: () => router.push("https://x.com/AhadSheikh1814_"),
    },
    {
      label: "Peerlist",
      icon: IconUser,
      action: () => router.push("https://peerlist.io/ahadsheikh"),
      customIcon: {
        src: "/peerlist.webp",
        alt: "Peerlist",
      },
    },
  ];

  // Define navigation items
  const navigationItems: MenuItem[] = [
    {
      label: "Home",
      icon: IconHome,
      action: () => router.push("/"),
    },
    {
      label: "Projects",
      icon: IconFolderCog,
      action: () => router.push("/projects"),
    },
    {
      label: "Blogs",
      icon: IconBrandBlogger,
      action: () => router.push("/blog"),
    },
    {
      label: "Resources",
      icon: IconTools,
      action: () => router.push("/resources"),
    },
    {
      label: "About",
      icon: IconUser,
      action: () => router.push("/about"),
    },
    {
      label: "Contact",
      icon: IconMail,
      action: () => router.push("/contact"),
    },
    {
      label: "Ahad AI",
      icon: IconRobotFace,
      action: () => router.push("/ai"),
    },
  ];

  // Define theme options
  const themeOptions: ThemeOption[] = [
    {
      label: "Light Mode",
      icon: IconSun,
      value: "light",
    },
    {
      label: "Dark Mode",
      icon: IconMoon,
      value: "dark",
    },
  ];

  // Common item className
  const itemClassName =
    "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800";

  if (!mounted) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900">
          <VisuallyHidden>
            <Dialog.Title>Command Menu</Dialog.Title>
            <Dialog.Description>Quick navigation and search</Dialog.Description>
          </VisuallyHidden>

          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-neutral-500 dark:[&_[cmdk-group-heading]]:text-neutral-400">
            <div className="flex items-center border-b border-neutral-200 px-4 dark:border-neutral-700">
              <IconSearch className="mr-2 h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
              <Command.Input
                placeholder="Type a command or search..."
                className="flex-1 border-0 bg-transparent py-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            </div>

            <Command.List
              className="max-h-[400px] overflow-y-auto p-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:bg-transparent"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor:
                  theme === "dark"
                    ? "#404040 transparent"
                    : "#d4d4d4 transparent",
              }}
            >
              <Command.Empty className="py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                No results found.
              </Command.Empty>

              {/* Socials Group */}
              <Command.Group heading="Socials">
                {socialLinks.map((item) => (
                  <Command.Item
                    key={item.label}
                    onSelect={() => handleSelect(item.action)}
                    className={itemClassName}
                  >
                    {item.customIcon ? (
                      <Image
                        src={item.customIcon.src}
                        alt={item.customIcon.alt}
                        width={24}
                        height={24}
                        className="h-4 w-4 shrink-0 object-cover"
                      />
                    ) : (
                      <item.icon className="h-4 w-4 shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              {/* Navigation Group */}
              <Command.Group heading="Navigation">
                {navigationItems.map((item) => (
                  <Command.Item
                    key={item.label}
                    onSelect={() => handleSelect(item.action)}
                    className={itemClassName}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Separator className="my-2 h-px bg-neutral-200 dark:bg-neutral-700" />

              {/* Preferences Group */}
              <Command.Group heading="Preferences">
                {themeOptions.map((option) => (
                  <Command.Item
                    key={option.value}
                    onSelect={() => handleSelect(() => setTheme(option.value))}
                    className={itemClassName}
                  >
                    <option.icon className="h-4 w-4 shrink-0" />
                    <span>{option.label}</span>
                    {theme === option.value && (
                      <span className="ml-auto text-xs text-neutral-400">
                        ✓
                      </span>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
