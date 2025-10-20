import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Image from 'next/image'
import { ButtonSimple, ButtonsColorfull, ButtonsDarkToLight,ButtonLink } from '@/components/snippets/Buttons'
import { CopyButton } from '@/components/ui/CopyButton'

type BlogFrontMatter = {
  title: string;
  description?: string;
  date?: string;
  image?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'snippets', `${slug}.mdx`)
  try {
    const singleSnippet = await fs.readFile(filePath, 'utf-8')
    const { frontmatter } = await compileMDX<BlogFrontMatter>({
      source: singleSnippet,
      options: { parseFrontmatter: true },
    })
    return {
      title: `${frontmatter.title} - Ahad Sheikh`,
      description: frontmatter.description || 'A collection of insightful Snippets for websiets by Ahad Sheikh.',
    }
  } catch {
    return {
      title: 'Snippet not found - Ahad Sheikh',
      description: 'Snippet not found.',
    }
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

const SingleSnippetPage = async ({ params }: Props) => {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'snippets', `${slug}.mdx`)
  let singleSnippet = ''
  try {
    singleSnippet = await fs.readFile(filePath, 'utf-8')
  } catch (error) {
    return <div>Snippet not found.</div>
  }

  const { content, frontmatter } = await compileMDX<BlogFrontMatter>({
    source: singleSnippet,
    options: { parseFrontmatter: true },
    components: {
      ButtonSimple,
      ButtonsColorfull,
      ButtonsDarkToLight,
      ButtonLink,
      CopyButton
    }
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

export default SingleSnippetPage