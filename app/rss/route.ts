import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "Blog | Ahad Sheikh",
    description: "Portfolio and articles by Ahad Sheikh",
    site_url: "https://ahadsheikh.vercel.app",
    feed_url: "https://ahadsheikh.vercel.app/rss",
    language: "en",
    pubDate: new Date("2026-03-08"),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ahad Sheikh`,
    generator: "Next.js RSS Feed",
  });

  const posts = [
    {
      title: "Building a Simple Unique Visitor Counter Widget for Your Portfolio",
      description:
        "Learn how to build a simple unique visitor counter widget for your Next.js portfolio to track and display the number of unique visitors to your site.",
      url: "https://ahadsheikh.vercel.app/blog/Unique-visitor-counter",
      date: new Date("2026-03-08"),
      categories: ["Next.js", "Tutorial", "Web Development"],
      author: "Ahad Sheikh",
    },
    {
      title: "Building a Spotify Now Playing Widget for Your Portfolio",
      description:
        "Learn how to integrate Spotify's API to display your currently playing music on your Next.js portfolio with a beautiful animated component.",
      url: "https://ahadsheikh.vercel.app/blog/Spotify",
      date: new Date("2024-10-27"),
      categories: ["Next.js", "API", "Tutorial"],
      author: "Ahad Sheikh",
    },
    {
      title: "Introducing AHs Lab: A Modern Component Library for Next.js",
      description:
        "Discover AHs Lab, a curated collection of accessible, high-performance React components designed specifically for Next.js RSC applications.",
      url: "https://ahadsheikh.vercel.app/blog/AHs-Lab",
      date: new Date("2024-10-26"),
      categories: ["Next.js", "React", "Component Library"],
      author: "Ahad Sheikh",
    },
  ];

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: post.url,
      guid: post.url,
      categories: post.categories,
      author: post.author,
      date: post.date,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}