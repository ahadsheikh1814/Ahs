"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";

export const ButtonsColorfull = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.button 
      className={cn(
        // Base styles
        'px-6 py-3 rounded-lg font-semibold text-base cursor-pointer',
        'relative overflow-hidden transition-all duration-100 ease-in-out',
        'transform hover:scale-105 active:scale-95',
        
        // Gradient background
        'bg-gradient-to-r from-green-400 via-cyan-400 to-pink-400',
        'hover:bg-gradient-to-r hover:from-green-500 hover:via-cyan-500 hover:to-pink-500',
        
        // Text styling
        'text-white drop-shadow-sm',
        
        // Focus states for accessibility
        'focus:outline-none focus:ring-4 focus:ring-pink-300/50',
        
        // Shadow effects
        'shadow-lg hover:shadow-xl',
        
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration:.1 , ease:"backOut" }}
    >
      {children}
    </motion.button>
  );
};

export const ButtonsDarkToLight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
})=>{
    return(
        <button className={cn(className,
            'px-6 py-2 rounded font-semibold text-base cursor-pointer border border-neutral-700 text-white',
        'relative overflow-hidden transition-colors duration-1000 ease-in-out',
        'bg-gradient-to-br from-purple-950 to-pink-950',
        'hover:from-purple-500 to-pink-500'
        )
        }>
            {children}
        </button>
    )
}


export const ButtonSimple = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
})=>{
    return(
        <button className={cn(className,
            'px-6 py-3 rounded-lg font-semibold text-base cursor-pointer border border-neutral-700',
        'relative overflow-hidden transition-all duration-100 ease-in-out',
        'transform hover:scale-105 active:scale-95'
        )
        }>
            {children}
        </button>
    )
}

export const ButtonLink = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
})=>{
  return(
    <button className={cn(className,
      "flex items-center text-xl font-semibold relative w-fit border-b border-primary cursor-pointer group/link mx-3 pb-2",
    )}>
      {children}
      <MoveRight className="size-6 ml-1 group-hover/link:ml-5 transition-all duration-200 ease-in-out" />
    </button>
  );
}