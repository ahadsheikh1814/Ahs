import H1 from "@/components/elements/H1";
import Hero from "@/components/landing/Hero";
import ProjectCards from "@/components/landing/ProjectCards";
import React from "react";
import { Projects } from "@/lib/projects";
import BlogPreview from "@/components/landing/BlogPreview";
import SeeMoreBtn from "@/components/elements/SeeMoreBtn";
import HighLightText from "@/components/elements/HighLightText";



const page =  () => {
  
  return (
    <div className="min-h-screen">
    <Hero/>
    <div className="mt-10">
    <HighLightText>
      <span className="text-2xl text-primary/80 dark:text-primary/90 font-bold px-2">Projects</span>
    </HighLightText>
    </div>
    <div className="grid md:grid-cols-2 gap-10 mt-5">
    {Projects.map((itm,idx)=>(
      <ProjectCards key={idx} title={itm.title} description={itm.description} imgUrl={itm.imgUrl} tech={itm.tech} link={itm.link} LandImg={itm.LandImg} GitDir={itm.GitDir}/>
    ))}
    </div>
    <div className="w-full flex justify-center mt-3">
        <SeeMoreBtn link="/projects">See More</SeeMoreBtn>
      </div>
      <div className="mt-10">
    <HighLightText>
      <span className="text-2xl text-primary/80 dark:text-primary/90 font-bold px-2">Blogs</span>
    </HighLightText>
    </div>
    <BlogPreview/>
    </div>
  );
};

export default page;
