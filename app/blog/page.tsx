import React from "react";
import { Metadata } from "next";
import { getBlogs } from "@/utils/mdx";
import Link from "next/link";
import H1 from "@/components/elements/H1";
import HighLightText from "@/components/elements/HighLightText";

export const metadata: Metadata = {
  title: "Blogs - Ahad Sheikh",
  description: "All blogs - Ahad Sheikh",
};

const truncate = (str: string, n: number) => {
  return str?.length > n ? str.substring(0, n - 1) + "..." : str;
};

const AllBlogsPage = async () => {
  const blogs = await getBlogs(); // Fix: removed debug console.log, await once

  return (
    <div className="min-h-screen"> {/* Fix: removed pointless relative */}
      <H1>All Blogs</H1>
      <HighLightText>I like to write for community</HighLightText>

      <div className="mt-10 flex flex-col gap-3">
        {blogs.map((blog, idx) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={idx}
            // Fix: flex-col on mobile, flex-row on md+; hover state; correct border/bg
            className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between
              border border-neutral-200 dark:border-neutral-700
              bg-neutral-50 dark:bg-neutral-800/50
              rounded-lg p-4
              transition-colors duration-200
              hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {/* Left: title + description */}
            <div className="flex flex-col gap-1 min-w-0"> {/* Fix: min-w-0 prevents overflow */}
              <h2 className="tracking-tight text-sm font-semibold text-neutral-800 dark:text-neutral-100 leading-snug">
                {/* Fix: tracking-tight typo fixed */}
                {blog.title}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {/* Fix: 100 chars on full page gives more context than 50 */}
                {truncate(blog.description || "", 100)}
              </p>
            </div>

            {/* Fix: <time> element, shrink-0, no conflicting pt-4, no weekday */}
            <time
              dateTime={blog.date}
              className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500 md:text-right"
            >
              {new Date(blog.date || new Date()).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;