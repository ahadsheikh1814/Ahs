import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "Blog | Ahad Sheikh",
    description: "Portfolio and articles by Ahad Sheikh",
    site_url: "https://ahadsheikh.vercel.app",
    feed_url: "https://ahadsheikh.vercel.app/rss",
    language: "en",
  });

  const posts = [
    {
      title: "Introducing AHs Lab: A Modern Component Library for Next.js",
      description:
        "Discover AHs Lab, a curated collection of accessible, high-performance React components designed specifically for Next.js RSC applications.",
      url: "https://ahadsheikh.vercel.app/blog/AHs-Lab",
      date: new Date("2024-10-26"),
      image: "https://ahadsheikh.vercel.app/AhsLab.webp",
      imageType: "image/webp",
    },
    {
      title: "Building a Spotify Now Playing Widget for Your Portfolio",
      description:
        "Learn how to integrate Spotify's API to display your currently playing music on your Next.js portfolio with a beautiful animated component.",
      url: "https://ahadsheikh.vercel.app/blog/Spotify",
      date: new Date("2024-10-27"),
      image: "https://ahadsheikh.vercel.app/icons/spotify.png",
      imageType: "image/png",
    },
    {
      title: "Building a Simple Unique Visitor Counter Widget for Your Portfolio",
      description:
        "Learn how to build a simple unique visitor counter widget for your Next.js portfolio to track and display the number of unique visitors to your site.",
      url: "https://ahadsheikh.vercel.app/blog/Unique-visitor-counter",
      date: new Date("2026-03-08"),
      image: "https://ahadsheikh.vercel.app/unique-visitor-counter.png",
      imageType: "image/png",
    },
  ];

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: post.url,
      date: post.date,
      enclosure: { url: post.image, type: post.imageType },
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}