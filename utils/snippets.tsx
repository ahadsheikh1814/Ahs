import path from 'path';
import { promises as fs } from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';

type SnippetsFrontMatter = {
  title: string;
  description?: string;
  date?: string;
  icon?: string ;
};

export const getSnippets = async () => {
  const files = fs.readdir(path.join(process.cwd(), 'snippets'));
  const allSnippets = await Promise.all(
    (await files).map(async (file) => {
      const slug = file.replace('.mdx', '');
      const frontmatter = await getSnippetsFrontMatter(slug);
      return {
        slug,
        ...frontmatter,
      };
    })
  );
  return allSnippets;
};

const getSnippetsFrontMatter = async (slug: string) => {
  const singleSnippet = await fs.readFile(
    path.join(process.cwd(), 'snippets', `${slug}.mdx`),
    'utf-8'
  );
  if (!singleSnippet) return null;
  const { frontmatter } = await compileMDX<SnippetsFrontMatter>({
    source: singleSnippet,
    options: { parseFrontmatter: true },
  });
  return frontmatter;
};