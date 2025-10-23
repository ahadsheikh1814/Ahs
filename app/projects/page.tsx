import H1 from "@/components/elements/H1";
import HighLightText from "@/components/elements/HighLightText";
import ProjectCards from "@/components/landing/ProjectCards";
import { Projects } from "@/lib/projects";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <H1 className="mt-10">Projects</H1>
      <HighLightText>I love to make cool things</HighLightText>
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
    </div>
  );
};

export default page;

