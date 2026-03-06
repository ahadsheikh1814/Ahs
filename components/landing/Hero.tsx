"use client";

import React from "react";
import H1 from "../elements/H1";
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeOut, delay },
});

const Hero = () => {
  return (
    <section className="mt-10">
      <H1>Ahad Sheikh</H1>

      <motion.div
        {...fadeUp(0.1)}
        className="relative mb-5 flex flex-wrap items-center gap-x-1 leading-7 text-zinc-700 dark:text-zinc-400"
      >
        Building{" "}
        <a
          href="https://ahs-lab.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-sm bg-neutral-100 px-2 py-0.5 font-bold transition-colors hover:bg-neutral-200 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
        >
          AHs Lab
        </a>
        and other{" "}
        <span className="font-bold text-zinc-800 dark:text-zinc-200">
          cool things
        </span>
      </motion.div>

      <motion.p {...fadeUp(0.2)} className="text-zinc-600 dark:text-zinc-500">
        Frontend Developer Specializing in Interactive UI & Performance. Find me
        on{" "}
        <a
          href="https://x.com/AhadSheikh1814_"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-zinc-800 underline-offset-2 transition-colors hover:text-zinc-600 hover:underline dark:text-zinc-300 dark:hover:text-zinc-100"
        >
          twitter
        </a>{" "}
        and{" "}
        <a
          href="https://peerlist.io/ahadsheikh"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-zinc-800 underline-offset-2 transition-colors hover:text-zinc-600 hover:underline dark:text-zinc-300 dark:hover:text-zinc-100"
        >
          peerlist
        </a>{" "}
        for tech updates and memes.
      </motion.p>

      <motion.div {...fadeUp(0.3)} className="mt-5 flex items-center gap-2">
        <a
          href="https://x.com/AhadSheikh1814_"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <IconBrandX className="h-5 w-5" />
        </a>
        <a
          href="https://github.com/ahadsheikh1814"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <IconBrandGithub className="h-5 w-5" />
        </a>
        <a
          href="https://peerlist.io/ahadsheikh"
          target="_blank"
          rel="noreferrer"
          className="block h-5 w-5 overflow-hidden rounded-sm opacity-60 transition-opacity hover:opacity-100"
        >
          <Image
            src="/peerlist.webp"
            alt="Peerlist"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;