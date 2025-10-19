"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProjectCards = ({
  title,
  description,
  imgUrl,
  tech,
  link
}: {
  title: string;
  description: string;
  imgUrl: string;
  tech: string[];
  link:string;
}) => {
  const router = useRouter();
  return (
    <div className="relative h-full w-full">
      <div 
      onClick={()=>router.push(link)}
      className="relative flex flex-col items-start rounded border border-neutral-300 p-4 dark:border-gray-800 cursor-pointer">
        <div className="my-4 w-14 h-14 overflow-hidden">
          <Image
          src={imgUrl}
          alt={title}
          width={1200}
          height={1200}
          className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h4>
          <p className="pt-4 leading-6 text-gray-700 dark:text-gray-300">
            {description}
          </p>
          <div className="flex flex-wrap pt-4 md:flex-row">
            {tech.map((itm) => (
              <p
                key={itm}
                className="mr-2 mb-2 rounded-md bg-gray-50 px-1 text-xs leading-5 text-gray-700 italic dark:border dark:border-zinc-700 dark:bg-transparent dark:text-gray-300"
              >
                {itm}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
