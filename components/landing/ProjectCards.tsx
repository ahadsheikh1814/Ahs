"use client";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconWorldWww } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";

const ProjectCards = ({
  title,
  description,
  imgUrl,
  tech,
  link,
  LandImg,
  GitDir
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
          "relative flex h-96  flex-col items-start rounded",
          "transition-all duration-100 ease-in-out",
          "sm:shadow-[var(--shadow-ahs)]"
        )}
        style={{
          boxShadow: isHovered ? 'var(--shadow-ahs)' : 'none'
        }}
      >
        <div className={cn(
          "h-[50%] w-full overflow-hidden rounded",
          "z-10 group-hover:scale-103",
          "transition-all duration-100 ease-in-out"          
        )}>
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
            <div className="-mt-1 h-6 w-6 overflow-hidden rounded">
              <Image
                src={imgUrl}
                alt="Logo"
                height={100}
                width={100}
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="text-lg text-gray-900 dark:text-gray-100">
              {title}
            </h4>
          </div>
          <p className="pt-4 text-sm leading-6 text-gray-700 w-[80%] z-10 group-hover:w-full transition-all duration-75 ease-in-out dark:text-gray-300">
            {description}
          </p>
          <div className="flex flex-wrap pt-4 md:flex-row">
            {tech.map((itm) => (
              <p
                key={itm}
                className="mr-2 mb-2 rounded-sm bg-neutral-200 px-1 text-xs leading-5 font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100"
              >
                {itm}
              </p>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <a href={link} className="flex gap-1 text-xs bg-primary text-background items-center px-3 py-1 rounded">
              <IconWorldWww className="h-5 w-5"/>
              Website
            </a>
            {GitDir && (
              <a href={GitDir} className="flex gap-1 text-xs bg-primary text-background items-center px-3 py-1 rounded">
              <IconBrandGithub className="h-5 w-5"/>
              Source
            </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
