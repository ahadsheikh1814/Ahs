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
  IconRobot,
  IconSearch,
  IconTools,
  IconMoon,
  IconSun,
  IconUser,
} from "@tabler/icons-react";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
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

  if (!mounted) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-neutral-700 dark:bg-neutral-900">
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

            <Command.List className="max-h-[400px] overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation">
                <Command.Item
                  onSelect={() => handleSelect(() => router.push("/"))}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                >
                  <IconHome className="h-4 w-4 shrink-0" />
                  <span>Home</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => router.push("/projects"))}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                >
                  <IconFolderCog className="h-4 w-4 shrink-0" />
                  <span>Projects</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => router.push("/blog"))}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                >
                  <IconBrandBlogger className="h-4 w-4 shrink-0" />
                  <span>Blogs</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => router.push("/resources"))}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                >
                  <IconTools className="h-4 w-4 shrink-0" />
                  <span>Resources</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => router.push("/about"))}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                >
                  <IconUser className="h-4 w-4 shrink-0" />
                  <span>About</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => router.push("/contact"))}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                >
                  <IconMail className="h-4 w-4 shrink-0" />
                  <span>Contact</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => router.push("/ai"))}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                >
                  <IconRobot className="h-4 w-4 shrink-0" />
                  <span>Ahad AI</span>
                </Command.Item>
              </Command.Group>

              <Command.Separator className="my-2 h-px bg-neutral-200 dark:bg-neutral-700" />

              <Command.Group heading="Preferences">
                <Command.Item
                  onSelect={() => handleSelect(() => setTheme("light"))}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                >
                  <IconSun className="h-4 w-4 shrink-0" />
                  <span>Light Mode</span>
                  {theme === "light" && (
                    <span className="ml-auto text-xs text-neutral-400">✓</span>
                  )}
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => setTheme("dark"))}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:aria-selected:bg-neutral-800"
                >
                  <IconMoon className="h-4 w-4 shrink-0" />
                  <span>Dark Mode</span>
                  {theme === "dark" && (
                    <span className="ml-auto text-xs text-neutral-400">✓</span>
                  )}
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}