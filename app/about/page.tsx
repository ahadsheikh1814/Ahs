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

      <div className="flex w-full flex-col md:flex-row relative overflow-hidden">
        
        {/* Left column */}
        <div className="flex-1 border-b border-neutral-200 dark:border-neutral-700 md:border-b-0 md:border-r px-5 pt-8 pb-8 md:pl-0 md:pr-10 md:pt-10 md:pb-10">
          
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
          <h3 className="mt-8 md:mt-10 pb-1 text-xs font-medium tracking-tight text-neutral-600 dark:text-neutral-300">
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

          <h1 className="text-3xl sm:text-4xl leading-none font-[700] tracking-tight">
            Over 10 years <br />
            in the game.
          </h1>

          <p className="mt-6 md:mt-10 text-sm leading-relaxed font-medium tracking-tight text-neutral-700 dark:text-neutral-300 max-w-prose">
            Crafting pixels and playing with designs is my kind of fun. UI
            Designer at Riotters&apos;.
            <br />
            <br />
            I obsess over the details, &apos;cause that&apos;s what turns good
            into great. Mixing styles, stirring in dynamic animations, and
            always staying ahead of trends — I bring the clean, sharp look your
            brand needs to stand out.
          </p>

          {/* View projects */}
          <div className="group mt-8 md:mt-10 flex w-fit cursor-pointer items-center text-sm">
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

      <QuoteCard />

    </div>
  );
};

export default Page;