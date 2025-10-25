import React from "react";
import Link from "next/link";
import { getBlogs } from "@/utils/mdx";
import SeeMoreBtn from "../elements/SeeMoreBtn";

const truncate = (str: string, n: number) => {
  return str?.length > n ? str.substring(0, n - 1) + "..." : str;
};
const BlogPreview = async () => {
  const allBlogs = getBlogs();
  const blogs = (await allBlogs).slice(0, 3); // Limit to max 3 blogs
  return (
    <div>
      <div className="border-accent-foreground/10 bg-accent mt-5 mb-2 flex flex-col gap-10 rounded border p-3">
        {blogs.map((blog, idx) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={idx}
            className="flex md:flex-row flex-col md:items-center md:justify-between"
          >
            <div className="">
              <h2 className="tracking-tigh text-base font-bold text-neutral-600 dark:text-neutral-200">
                {blog.title}
              </h2>
              <p className="pt-2 text-sm text-neutral-600 md:text-base dark:text-neutral-200">
                {truncate(blog.description || "", 100)}
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

      <div className="w-full flex justify-center mt-3">
        <SeeMoreBtn link="/blog">See All blogs</SeeMoreBtn>
      </div>
    </div>
  );
};

export default BlogPreview;
