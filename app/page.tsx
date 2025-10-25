import H1 from "@/components/elements/H1";
import Hero from "@/components/landing/Hero";
import ProjectCards from "@/components/landing/ProjectCards";
import React from "react";
import { Projects } from "@/lib/projects";
import BlogPreview from "@/components/landing/BlogPreview";
import SeeMoreBtn from "@/components/elements/SeeMoreBtn";



const page =  () => {
  
  return (
    <div className="min-h-screen">
    <Hero/>
    <H1 className="mt-10">Projects</H1>
    <div className="grid md:grid-cols-2 gap-10 mt-5">
    {Projects.map((itm,idx)=>(
      <ProjectCards key={idx} title={itm.title} description={itm.description} imgUrl={itm.imgUrl} tech={itm.tech} link={itm.link} LandImg={itm.LandImg} GitDir={itm.GitDir}/>
    ))}
    </div>
    <div className="w-full flex justify-center mt-3">
        <SeeMoreBtn link="/projects">See More</SeeMoreBtn>
      </div>
    <H1 className="mt-10">Blogs</H1>
    <BlogPreview/>
    </div>
  );
};

export default page;
