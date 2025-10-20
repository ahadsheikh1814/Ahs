import H1 from "@/components/elements/H1";
import HighLightText from "@/components/elements/HighLightText";
import Link from "next/link";
import React from "react";
import { getSnippets } from "@/utils/snippets";
import SnippetsCards from "@/components/landing/SnippetsCards";

const snippets = async () => {
  
  const allSnippets = getSnippets();
  console.log(await allSnippets);
  return (
    <div>
      <H1>Snippets</H1>
      <div className="flex gap-2 pt-2">
        <HighLightText>Reusable code snippets </HighLightText>
        that can be easily integrated in your application 🧩.
      </div>
      <div className="mt-5 grid gap-10 md:grid-cols-2">
        {(await allSnippets).map((snippet, idx) => (
          <Link
            href={`/snippets/${snippet.slug}`}
            key={idx}
            className="flex items-center justify-between"
          >
            <SnippetsCards
              title={snippet.title}
              description={snippet.description}
              icon={snippet.icon}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default snippets;
