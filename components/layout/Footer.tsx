import { IconBrandX, IconRss } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import HighLightText from "../elements/HighLightText";

const Footer = () => {
  return (
    <footer className="relative mx-auto w-full border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          {/* Left Section - Social Links */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">
              Find me on
            </span>

            <div className="flex items-center gap-3">
              <a
                href="https://x.com/AhadSheikh1814_"
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                aria-label="Twitter/X"
              >
                <IconBrandX className="h-5 w-5" />
              </a>

              <a
                href="https://peerlist.io/ahadsheikh"
                className="block h-5 w-5 overflow-hidden rounded transition-opacity hover:opacity-80"
                aria-label="Peerlist"
              >
                <Image
                  src="/peerlist.webp"
                  alt="Peerlist"
                  width={20}
                  height={20}
                  className="h-full w-full object-cover"
                />
              </a>
            </div>
          </div>

          {/* Center Section - Credits */}
          <div className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400">
            <span>Portfolio inspired by</span>

            <HighLightText>
              <a
                href="https://manuarora.in/"
                className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Manu Arora
              </a>
            </HighLightText>
          </div>

          {/* Right Section - RSS & AI Links */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/rss"
              className="flex items-center gap-1.5 text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              aria-label="RSS Feed"
            >
              <IconRss className="h-4 w-4" />
              <span>RSS</span>
            </a>

            <a
              href="/llms.txt"
              className="rounded-md border border-neutral-200 px-2.5 py-1 text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
              aria-label="LLMs.txt"
            >
              llms.txt
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;