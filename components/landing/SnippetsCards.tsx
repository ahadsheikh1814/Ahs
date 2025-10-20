import Image from "next/image";
import React from "react";

const SnippetsCards = ({
  title,
  description,
  icon,
}: {
  title?: string;
  description?: string;
  icon?: string;
}) => {
  return (
    <div className="relative flex cursor-pointer flex-col items-start rounded border border-neutral-300 p-4 dark:border-gray-800 w-full">
      <div>
        <div className="my-4 h-14 w-14 overflow-hidden rounded-full">
          {title && icon && (
            <Image
              src={icon}
              alt={title}
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
      <h4 className="pt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {title}
      </h4>
      <p className="pt-2 leading-6 text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default SnippetsCards;
