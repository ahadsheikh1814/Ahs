import React from "react";
import H1 from "../elements/H1";
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="mt-10">
      <H1>Ahad Sheikh</H1>
      <div className="relative mb-5 flex-wrap items-center leading-7 text-zinc-700 dark:text-zinc-400">
        Building{" "}
        <a
          href="https://ahs-lab.vercel.app"
          className="mx-1 inline-block bg-gray-100 px-2 py-0 font-bold dark:bg-zinc-700 dark:text-white"
        >
          AHs Lab
        </a>
        and other{" "}
        <span className="cursor-pointer font-bold text-zinc-800 dark:text-zinc-200">
          {" "}
          cool things
        </span>
      </div>
      <p className="text-zinc-600 dark:text-zinc-500">
        Frontend Developer Specializing in Interactive UI & Performance. Find me
        on{" "}
        <a
          href="https://x.com/AhadSheikh1814_"
          className="group font-inter relative inline-flex overflow-hidden font-bold dark:text-zinc-400"
          target="__blank"
        >
          <span className="relative">twitter</span>
        </a>{" "}
        and{" "}
        <a
          href="https://peerlist.io/ahadsheikh"
          className="group font-inter relative inline-flex overflow-hidden font-bold dark:text-zinc-400"
          target="__blank"
        >
          <span className="relative">peerlist</span>
        </a>{" "}
        for tech updates and memes.
      </p>
      <div className="mt-5 flex items-center gap-1">
        <a href="https://x.com/AhadSheikh1814_">
          <IconBrandX className="h-5 w-5" />
        </a>
        <a href="https://github.com/ahadsheikh1814">
          <IconBrandGithub className="h-5 w-5" />
        </a>
        <a
          href="https://peerlist.io/ahadsheikh"
          className="block h-5 w-5 overflow-hidden"
        >
          <Image
            src={"/peerlist.webp"}
            alt="Peerlist"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
