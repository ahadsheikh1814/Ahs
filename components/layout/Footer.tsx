"use client";

import { IconBrandX, IconRss } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import VisitorCounter from "../provider/unique-visitor";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://x.com/AhadSheikh1814_",
      icon: <IconBrandX className="h-4 w-4" />,
      label: "Twitter/X",
    },
    {
      href: "https://peerlist.io/ahadsheikh",
      icon: (
        <Image
          src="/peerlist.webp"
          alt="Peerlist"
          width={16}
          height={16}
          className="h-4 w-4 object-cover"
        />
      ),
      label: "Peerlist",
    },
    {
      href: "/rss",
      icon: <IconRss className="h-4 w-4" />,
      label: "RSS Feed",
    },
  ];

  const metaLinks = [
    { href: "/llms.txt", label: "llms.txt" },
    { href: "https://manuarora.in/", label: "Inspired by Manu" },
    { href: "/ai", label: "AI" },
  ];

  return (
    <footer className="relative w-full border-t border-neutral-200/60 dark:border-neutral-800/60">
      {/* Container */}
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-6 sm:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Left Column - Branding & Copyright */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/apple-icon.webp"
                  alt="Ahad Sheikh"
                  width={24}
                  height={24}
                  className="h-6 w-6 overflow-hidden rounded-md object-cover"
                />
                <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  Ahad Sheikh
                </span>
              </div>
              <p className="text-xs leading-relaxed font-medium text-neutral-600 dark:text-neutral-400 text-balance">
                Building digital experiences with clean code and thoughtful
                design.
              </p>
            </div>

            {/* Center Column - Navigation Links */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-500">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-2.5">
                {metaLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="group inline-flex items-center text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    <span className="mr-2 h-px w-4 bg-neutral-300 transition-all group-hover:w-6 group-hover:bg-neutral-900 dark:bg-neutral-700 dark:group-hover:bg-neutral-100" />
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Right Column - Social & Visitor Counter */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-500">
                Connect
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <div className="mt-2">
                <VisitorCounter />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="border-t border-neutral-200/60 py-6 dark:border-neutral-800/60">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              © {currentYear} Ahad Sheikh. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-600">
              <span>Crafted with precision</span>
              <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span>Built with Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
