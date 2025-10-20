import path from 'path';
import { promises as fs } from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';

type BlogFrontMatter = {
  title: string;
  description?: string;
  date?: string;
  image?: string;
};

export const getBlogs = async () => {
  const files = fs.readdir(path.join(process.cwd(), 'data'));
  const allBlogs = await Promise.all(
    (await files).map(async (file) => {
      const slug = file.replace('.mdx', '');
      const frontmatter = await getBlogFrontMatter(slug);
      return {
        slug,
        ...frontmatter,
      };
    })
  );
  return allBlogs;
};

const getBlogFrontMatter = async (slug: string) => {
  const singleBlog = await fs.readFile(
    path.join(process.cwd(), 'data', `${slug}.mdx`),
    'utf-8'
  );
  if (!singleBlog) return null;
  const { frontmatter } = await compileMDX<BlogFrontMatter>({
    source: singleBlog,
    options: { parseFrontmatter: true },
  });
  return frontmatter;
};