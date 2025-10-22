import H1 from "@/components/elements/H1";
import Hero from "@/components/landing/Hero";
import ProjectCards from "@/components/landing/ProjectCards";
import React from "react";
import { Projects } from "@/lib/projects";

const page = () => {
  return (
    <div className="min-h-screen">
    <Hero/>
    <H1 className="mt-10">Projects</H1>
    <div className="grid md:grid-cols-2 gap-10 mt-5">
    {Projects.map((itm,idx)=>(
      <ProjectCards key={idx} title={itm.title} description={itm.description} imgUrl={itm.imgUrl} tech={itm.tech} link={itm.link}/>
    ))}
    </div>
    </div>
  );
};

export default page;
