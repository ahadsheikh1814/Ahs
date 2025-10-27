"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { IconMusic } from "@tabler/icons-react";

interface SpotifyData {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

const Spotify = () => {
  const [songData, setSongData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify");
        const data = await response.json();
        
        if (data.isPlaying) {
          setSongData(data);
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return null;
  if (!songData?.isPlaying) return null;

  return (
    <AnimatePresence>
      <motion.a
        href={songData.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="group fixed bottom-8 left-8 z-50 flex items-center gap-3 rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900/80"
      >
        {/* Album Art */}
        <motion.div
          className="relative h-10 w-10 overflow-hidden rounded-full"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={songData.albumImageUrl}
            alt={`${songData.title} album art`}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
          {/* Animated equalizer bars */}
          <div className="absolute inset-0 flex items-center justify-center gap-0.5 bg-black/30">
            <motion.div
              className="h-3 w-0.5 bg-white"
              animate={{ height: ["8px", "12px", "8px"] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="h-3 w-0.5 bg-white"
              animate={{ height: ["10px", "14px", "10px"] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="h-3 w-0.5 bg-white"
              animate={{ height: ["8px", "12px", "8px"] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Song Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <IconMusic className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Now Playing
            </span>
          </div>
          <span className="max-w-[200px] truncate text-sm font-semibold text-gray-900 dark:text-white">
            {songData.title}
          </span>
          <span className="max-w-[200px] truncate text-xs text-gray-600 dark:text-gray-400">
            {songData.artist}
          </span>
        </div>

        {/* External Link Icon */}
        <motion.div
          className="text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
          whileHover={{ x: 2 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 12H11M4 12V5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.a>
    </AnimatePresence>
  );
};

export default Spotify;

