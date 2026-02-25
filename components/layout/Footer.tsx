import { IconBrandX } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import HighLightText from "../elements/HighLightText";

const Footer = () => {
  return (
    <div className="relative mx-auto h-full w-full  py-3 text-sm">
      <div className="flex w-full gap-1 items-center border-t border-neutral-200 py-3  dark:border-neutral-700">
        <p className="text-neutral-600 dark:text-neutral-400">Find me on </p>
        <div className="flex items-center justify-center gap-1">
          <a href="https://x.com/AhadSheikh1814_">
            <IconBrandX />
          </a>
          <span className="text-neutral-600 dark:text-neutral-400"> and </span>
          <a
            href="https://peerlist.io/ahadsheikh"
            className="block h-7 w-7 overflow-hidden"
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
      </div>
      <h3 className="flex flex-wrap items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
        Portfolio inspired by{" "}
        <span>
          <HighLightText>
            <a href="https://manuarora.in/">Manu Arora</a>
          </HighLightText>
        </span>{" "}
      </h3>
    </div>
  );
};

export default Footer;
