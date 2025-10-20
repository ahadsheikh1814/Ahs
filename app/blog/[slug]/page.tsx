import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Image from 'next/image'

type BlogFrontMatter = {
  title: string;
  description?: string;
  date?: string;
  image?: string;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'data', `${params.slug}.mdx`)
  try {
    const singleBlog = await fs.readFile(filePath, 'utf-8')
    const { frontmatter } = await compileMDX<BlogFrontMatter>({
      source: singleBlog,
      options: { parseFrontmatter: true },
    })
    return {
      title: `${frontmatter.title} - Ahad Sheikh`,
      description: frontmatter.description || 'A collection of insightful articles and tutorials on web development, programming, and technology by Ahad Sheikh.',
    }
  } catch {
    return {
      title: 'Blog post not found - Ahad Sheikh',
      description: 'Blog post not found.',
    }
  }
}

interface Props {
  params: { slug: string }
}

const SingleBlogPage = async ({ params }: Props) => {
  const { slug } = params
  const filePath = path.join(process.cwd(), 'data', `${slug}.mdx`)
  let singleBlog = ''
  try {
    singleBlog = await fs.readFile(filePath, 'utf-8')
  } catch (error) {
    return <div>Blog post not found.</div>
  }

  const { content, frontmatter } = await compileMDX<BlogFrontMatter>({
    source: singleBlog,
    options: { parseFrontmatter: true },
  })
  
  return (
    <div className='blog'>
      {frontmatter.image && (
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          width={1200}
          height={600}
          className="w-full h-68 object-cover shadow-xl mb-4 rounded-lg"
        />
      )}
      {content}
    </div>
  )
}

export default SingleBlogPage