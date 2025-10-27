"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  IconMusic,
  IconPlayerPlay,
  IconPlayerPause,
} from "@tabler/icons-react";

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
        } else {
          setSongData(null);
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      {isLoading ? (
        <div className="bg-accent/30 border-border/50 flex items-center gap-3 rounded-lg border p-3 text-sm shadow-inner">
          <div className="bg-accent/50 h-12 w-12 animate-pulse rounded-md" />
          <div className="flex flex-1 flex-col gap-1">
            <div className="bg-accent/50 h-3 w-16 animate-pulse rounded" />
            <div className="bg-accent/50 h-4 w-32 animate-pulse rounded" />
            <div className="bg-accent/50 h-3 w-24 animate-pulse rounded" />
          </div>
        </div>
      ) : songData ? (
        <motion.a
          href={songData.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-accent/30 border-border/50 hover:bg-accent/40 group flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm shadow-inner transition-colors"
        >
          {/* Album Art */}
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={songData.albumImageUrl}
              alt={`${songData.title} album art`}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <IconMusic className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Song Info */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              {songData.isPlaying ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-green-500"
                  >
                    <IconPlayerPlay className="h-3 w-3" />
                  </motion.div>
                  <span className="text-acbg-accent-foreground text-xs font-medium">
                    Now Playing
                  </span>
                </>
              ) : (
                <>
                  <IconPlayerPause className="text-acbg-accent-foreground h-3 w-3" />
                  <span className="text-acbg-accent-foreground text-xs font-medium">
                    Paused
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-foreground truncate font-medium">
                {songData.title}
              </span>
              <span className="text-acbg-accent-foreground truncate text-xs">
                {songData.artist}
              </span>
            </div>
          </div>
        </motion.a>
      ) : (
        <div className="bg-accent/30 border-border/50 flex items-center gap-3 rounded-lg border p-3 text-sm shadow-inner">
          <div className="bg-accent/50 flex h-12 w-12 items-center justify-center rounded-md">
            <Image
              alt="Spotify"
              loading="lazy"
              width={30}
              height={30}
              decoding="async"
              className="opacity-60"
              src="/icons/spotify.png"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-acbg-accent-foreground text-xs font-medium">
                Offline
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-acbg-accent-foreground font-medium">
                Not currently listening
              </span>
              <span className="text-acbg-accent-foreground text-xs">
                Music activity unavailable
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spotify;
