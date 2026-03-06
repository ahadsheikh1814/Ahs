import CursorFollower from "@/components/landing/CursorFollower";
import QuoteCard from "@/components/landing/QuoteCard";
import Skills from "@/components/landing/skills";
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-20">
      {/* CursorFollower */}
      <div className="hidden md:block">
        <CursorFollower />
      </div>

      <div className="relative flex w-full flex-col overflow-hidden md:flex-row">
        {/* Left column */}
        <div className="flex-1 border-b border-neutral-200 px-5 pt-8 pb-8 md:border-r md:border-b-0 md:pt-10 md:pr-10 md:pb-10 md:pl-0 dark:border-neutral-700">
          <h2 className="text-xl font-[600] tracking-tighter">
            Who&apos;s behind <br />
            the screen?
          </h2>

          <div className="mt-8 md:mt-10">
            <h3 className="pb-1 text-xs font-medium tracking-tight text-neutral-600 dark:text-neutral-300">
              Skills
            </h3>
            <Skills />
          </div>

          {/* Social icons */}
          <h3 className="mt-8 pb-1 text-xs font-medium tracking-tight text-neutral-600 md:mt-10 dark:text-neutral-300">
            Socials
          </h3>

          <div className="flex items-center gap-3">
            <a
              href="https://x.com/AhadSheikh1814_"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-60"
            >
              <IconBrandX className="h-5 w-5" />
            </a>

            <a
              href="https://github.com/ahadsheikh1814"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-60"
            >
              <IconBrandGithub className="h-5 w-5" />
            </a>

            <a
              href="https://peerlist.io/ahadsheikh"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-5 w-5 overflow-hidden rounded-sm transition-opacity duration-200 hover:opacity-60"
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

        {/* Right column */}
        <div className="flex-1 px-5 pt-8 md:px-10 md:pt-10">
          <h1 className="text-3xl leading-none font-[700] tracking-tight sm:text-4xl">
            3+ Years <br />
            Building on the Web.
          </h1>

          <p className="mt-6 max-w-prose text-sm leading-relaxed font-medium tracking-tight text-neutral-700 md:mt-10 dark:text-neutral-300">
            I build clean and interactive web experiences with a focus on
            performance and detail.
            <br />
            <br />I care about the small details — that&apos;s what makes great
            products stand out. I build modern web experiences with clean UI,
            smooth animations, and performance in mind.
          </p>

          {/* View projects */}
          <div className="group mt-8 flex w-fit cursor-pointer items-center text-sm md:mt-10">
            <Link
              href="/project"
              className="flex items-center gap-1 transition-all duration-300"
            >
              <span>View projects</span>
              <IconArrowRight className="h-4 w-4 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>

      <div className="my-10">
        <QuoteCard />
      </div>
    </div>
  );
};

export default Page;
