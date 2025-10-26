import Hero from "@/components/landing/Hero";
import ProjectCards from "@/components/landing/ProjectCards";
import React from "react";
import { Projects } from "@/lib/projects";
import BlogPreview from "@/components/landing/BlogPreview";
import SeeMoreBtn from "@/components/elements/SeeMoreBtn";
import Tech from "@/components/landing/Tech";

const page = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="mt-10">
      <h1 className="text-primary/80 dark:text-primary/90 text-2xl font-semibold">
          Projects
        </h1>
      </div>
      <div className="mt-5 grid gap-10 md:grid-cols-2">
        {Projects.map((itm, idx) => (
          <ProjectCards
            key={idx}
            title={itm.title}
            description={itm.description}
            imgUrl={itm.imgUrl}
            tech={itm.tech}
            link={itm.link}
            LandImg={itm.LandImg}
            GitDir={itm.GitDir}
          />
        ))}
      </div>
      <div className="mt-3 flex w-full justify-center">
        <SeeMoreBtn link="/projects">See More</SeeMoreBtn>
      </div>
      <div className="mt-10">
      <h1 className="text-primary/80 dark:text-primary/90 text-2xl font-semibold">
          Blogs
        </h1>
      </div>
      <BlogPreview />

      <div className="mt-10">
        <h1 className="text-primary/80 dark:text-primary/90 text-2xl font-semibold">
          Technologies & Tools
        </h1>
        <div className="my-5">
          <Tech />
        </div>
      </div>
    </div>
  );
};

export default page;
