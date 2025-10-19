import H1 from "@/components/elements/H1";
import ProjectCards from "@/components/landing/ProjectCards";
import { Projects } from "@/lib/projects";
import React from "react";

const page = () => {
  return (
    <div>
      <H1 className="mt-10">Projects</H1>
      <p className="bg-accent relative w-fit p-1 text-sm">
        I love to make cool things
        <Dots/>
      </p>
      <div className="mt-5 grid gap-10 md:grid-cols-2">
        {Projects.map((itm, idx) => (
          <ProjectCards
            key={idx}
            title={itm.title}
            description={itm.description}
            imgUrl={itm.imgUrl}
            tech={itm.tech}
            link={itm.link}
          />
        ))}
      </div>
    </div>
  );
};

export default page;

const Dots = () => {
  return (
    <>
    <span className="absolute h-[3px] p-px w-[3px] rounded-full -top-[1px] -left-[1px] inline-block bg-accent-foreground"/>
    <span className="absolute h-[3px] p-px w-[3px] rounded-full -top-[1px] -right-[1px] inline-block bg-accent-foreground"/>
    <span className="absolute h-[3px] p-px w-[3px] rounded-full -bottom-[1px] -left-[1px] inline-block bg-accent-foreground"/>
    <span className="absolute h-[3px] p-px w-[3px] rounded-full -bottom-[1px] -right-[1px] inline-block bg-accent-foreground"/>
    </>
  );
};
