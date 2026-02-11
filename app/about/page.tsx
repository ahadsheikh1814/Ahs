import H1 from "@/components/elements/H1";
import QuoteCard from "@/components/landing/QuoteCard";
import Skills from "@/components/landing/skills";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <H1>About Me</H1>
      <div className="relative mb-5 flex-wrap items-center text-sm leading-7 font-semibold text-neutral-700 md:w-[90%] dark:text-neutral-400">
        <p className="text-balance">
          Hey!{" I'm"}
          <span className="mx-1 inline-block bg-gray-100 px-2 py-0 font-bold dark:bg-neutral-700 dark:text-white">
            Ahad Sheikh
          </span>
          , a passionate self-taught frontend developer from Bangladesh.
        </p>
        <br />
        <p className="text-sm">
          Even though {" I'm"} currently in{" "}
          <span className="mx-1 inline-block bg-gray-100 px-2 py-0 dark:bg-neutral-700 dark:text-white">
            class 9
          </span>
          , I’ve already started building real-world web projects and exploring
          how design and code come together to create amazing experiences.
        </p>
      </div>
      <div>
        <h3 className="text-primary/80 mb-5 text-xl font-semibold">Skills</h3>
        <Skills />
      </div>
      <div className="mt-20">
        <QuoteCard />
      </div>
    </div>
  );
};

export default page;
