import React from "react";
import { tech } from "@/lib/Tech";
import Image from "next/image";

const Tech = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((item, idx) => (
        <a
          key={idx}
          target="_blank"
          rel="noopener noreferrer"
          className="skill-inner-shadow inline-flex items-center rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black dark:border-white/30 dark:bg-white/15 dark:text-white hover:scale-105 transition-transform"
          href={item.link}
        >
          <div className="size-4 flex-shrink-0 flex items-center justify-center">
            <Image
              src={item.icon}
              alt={item.title}
              width={16}
              height={16}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="ml-1 text-sm font-bold">{item.title}</p>
        </a>
      ))}
    </div>
  );
};

export default Tech;
