"use client";
import { SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ResourcesCard = ({
  link,
  title,
  description,
  linkText
}:{
  link: string;
  title: string;
  description: string;
  linkText?:string;
}) => {
  const router = useRouter()
  return (
    <div className="relative h-full w-full">
      <div
        onClick={()=>router.push(link)}
        className="relative flex cursor-pointer flex-col items-start rounded border border-neutral-300 p-4 dark:border-gray-800"
      >
        <div>
          <h4 className="text-neutral-600 dark:text-neutral-300 w-full justify-between items-center flex">{linkText}
          <SquareArrowOutUpRight/>
          </h4>
          <h4 className="text-xl pt-2 font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h4>
          <p className="pt-2 leading-6 text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesCard;
