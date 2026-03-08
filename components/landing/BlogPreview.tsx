import React from "react";
import Link from "next/link";
import { getBlogs } from "@/utils/mdx";
import SeeMoreBtn from "../elements/SeeMoreBtn";

const truncate = (str: string, n: number) => {
  return str?.length > n ? str.substring(0, n - 1) + "..." : str;
};

const BlogPreview = async () => {
  const allBlogs = getBlogs();
  const blogs = (await allBlogs).slice(0, 2);

  return (
    <div>
      <div className="mt-5 mb-2 flex flex-col gap-3">
        {blogs.map((blog, idx) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={idx}
            // Fix: hover state, corrected border color, proper responsive layout
            className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition-colors duration-200 hover:bg-neutral-100 md:flex-row md:items-center md:justify-between dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-800"
          >
            {/* Left: title + description */}
            <div className="flex min-w-0 flex-col gap-1">
              {/* Fix: typo tracking-tight, clear size hierarchy */}
              <h2 className="text-sm leading-snug font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
                {blog.title}
              </h2>
              <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                {/* Fix: longer truncation on desktop is handled naturally by min-w-0 + truncate */}
                {truncate(blog.description || "", 80)}
              </p>
            </div>

            {/* Fix: <time> instead of <h2>, shrink-0 prevents squishing, no conflicting pt on md */}
            <time
              dateTime={blog.date}
              className="shrink-0 text-xs text-neutral-400 md:text-right dark:text-neutral-500"
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

      <div className="mt-4 flex justify-center">
        <SeeMoreBtn link="/blog">See All Blogs</SeeMoreBtn>
      </div>
    </div>
  );
};

export default BlogPreview;
