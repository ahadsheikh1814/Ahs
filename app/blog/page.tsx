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
  const allBlogs = getBlogs();
  console.log(await allBlogs);
  return (
    <div className="relative min-h-screen">
      <H1>All Blogs</H1>
      <HighLightText>I like to write for community</HighLightText>
      <div className="border-accent-foreground/10 bg-accent mt-10 flex flex-col gap-10 rounded border p-3">
        {(await allBlogs).map((blog, idx) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={idx}
            className="flex items-center justify-between"
          >
            <div className="">
              <h2 className="tracking-tigh text-base font-bold text-neutral-600 dark:text-neutral-200">
                {blog.title}
              </h2>
              <p className="pt-2 text-sm text-neutral-600 md:text-base dark:text-neutral-200">
                {truncate(blog.description || "", 50)}
              </p>
            </div>
            <h2 className="pt-4 text-sm text-neutral-600 md:text-base dark:text-neutral-200">
              {new Date(blog.date || new Date()).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;
