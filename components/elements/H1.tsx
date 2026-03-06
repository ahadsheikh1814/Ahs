"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(className, "font-bold text-3xl md:text-4xl tracking-tight mb-2 text-primary drop-shadow-lg")}
    >
      {children}
    </motion.h1>
  );
};

export default H1;