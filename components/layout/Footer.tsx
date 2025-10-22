import { IconBrandX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HighLightText from "../elements/HighLightText";

const Footer = () => {
  return (
    <div className="relative mx-auto h-full w-full  py-3 md:py-3">
      <div className="flex w-full justify-between border-t border-neutral-100 py-3  dark:border-neutral-800">
        <p className="">Find me on </p>
        <div className="flex items-center justify-center gap-2">
          <a href="https://x.com/AhadSheikh1814_">
            <IconBrandX />
          </a>
          <span> and </span>
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
      <h3 className="flex gap-2">
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
