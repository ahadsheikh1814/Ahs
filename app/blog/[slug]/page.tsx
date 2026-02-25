import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'

type BlogFrontMatter = {
  title: string;
  description?: string;
  date?: string;
  image?: string;
};

// Fix: extracted to avoid duplication
const getBlogFilePath = (slug: string) =>
  path.join(process.cwd(), 'data', `${slug}.mdx`)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const source = await fs.readFile(getBlogFilePath(slug), 'utf-8')
    const { frontmatter } = await compileMDX<BlogFrontMatter>({
      source,
      options: { parseFrontmatter: true },
    })
    return {
      title: `${frontmatter.title} - Ahad Sheikh`,
      description:
        frontmatter.description ||
        'A collection of insightful articles and tutorials on web development, programming, and technology by Ahad Sheikh.',
    }
  } catch {
    return {
      title: 'Blog post not found - Ahad Sheikh',
      description: 'Blog post not found.',
    }
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

const SingleBlogPage = async ({ params }: Props) => {
  const { slug } = await params

  let source = ''
  try {
    source = await fs.readFile(getBlogFilePath(slug), 'utf-8')
  } catch {
    // Fix: styled not-found state with back link
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center">
        <p className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
          Blog post not found.
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          The post you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/blog"
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-200"
        >
          <IconArrowLeft className="h-4 w-4" />
          Back to all blogs
        </Link>
      </div>
    )
  }

  const { content, frontmatter } = await compileMDX<BlogFrontMatter>({
    source,
    options: { parseFrontmatter: true },
  })

  return (
    // Fix: max-w for readability, mx-auto to center, prose for MDX typography
    <div className="mx-auto max-w-2xl w-full">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-200 mb-8"
      >
        <IconArrowLeft className="h-4 w-4" />
        All blogs
      </Link>

      {/* Fix: h-72 (valid), full header block with title + date */}
      {frontmatter.image && (
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          width={1200}
          height={600}
          className="w-full h-72 object-cover rounded-lg shadow-md mb-6"
        />
      )}

      {/* Fix: title and date now actually rendered */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
        {frontmatter.title}
      </h1>

      {frontmatter.description && (
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {frontmatter.description}
        </p>
      )}

      {frontmatter.date && (
        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
          {new Date(frontmatter.date).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}

      <hr className="my-6 border-neutral-200 dark:border-neutral-700" />

      {/* Fix: prose classes for MDX typography, responsive prose size */}
      <div className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none blog">
        {content}
      </div>
    </div>
  )
}

export default SingleBlogPage