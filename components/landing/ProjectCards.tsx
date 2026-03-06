"use client";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconWorldWww } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

const ProjectCards = ({
  title,
  description,
  imgUrl,
  tech,
  link,
  LandImg,
  GitDir,
}: {
  title: string;
  description: string;
  imgUrl: string;
  tech: string[];
  link: string;
  LandImg: string;
  GitDir?: string;
}) => {
  const [isHovered, setHovered] = useState<boolean>(false);

  return (
    <div className="group relative h-full w-full">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex h-96 flex-col items-start rounded border border-neutral-200 bg-white transition-all duration-100 ease-in-out dark:border-neutral-800 dark:bg-neutral-900",
          "sm:shadow-[var(--shadow-ahs)]"
        )}
        style={{
          boxShadow: isHovered ? "var(--shadow-ahs)" : "none",
        }}
      >
        <div
          className={cn(
            "h-[50%] w-full overflow-hidden rounded",
            "z-10 group-hover:scale-103",
            "transition-all duration-100 ease-in-out"
          )}
        >
          <Image
            src={LandImg}
            alt={title}
            width={1200}
            height={1200}
            className="h-full w-full object-cover object-top-left"
          />
        </div>
        <div className="my-4 group-hover:mx-4 transition-all duration-100 ease-in-out sm:mx-4">
          <div className="flex items-center gap-2">
            <div className="-mt-1 h-6 w-6 overflow-hidden rounded border border-neutral-100 dark:border-neutral-800 shadow-sm">
              <Image
                src={imgUrl}
                alt="Logo"
                height={100}
                width={100}
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {title}
            </h4>
          </div>
          <p className="pt-4 text-sm leading-6 text-gray-700 w-[80%] z-10 group-hover:w-full transition-all duration-75 ease-in-out dark:text-gray-300">
            {description}
          </p>
          <div className="flex flex-wrap pt-4 md:flex-row">
            {tech.slice(0, 4).map((itm) => (
              <p
                key={itm}
                className="mr-2 mb-2 rounded-sm bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {itm}
              </p>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1.5 text-[11px] font-semibold bg-neutral-900 text-white items-center px-3 py-1.5 rounded-lg transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              <IconWorldWww className="h-4 w-4" />
              Website
            </motion.a>
            {GitDir && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={GitDir}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-1.5 text-[11px] font-semibold bg-white border border-neutral-200 text-neutral-700 items-center px-3 py-1.5 rounded-lg transition-colors hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700"
              >
                <IconBrandGithub className="h-4 w-4" />
                Source
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
