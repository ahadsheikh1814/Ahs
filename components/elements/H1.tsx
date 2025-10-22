import { cn } from "@/lib/utils";
import React from "react";

const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h1 className={cn(className,"font-bold text-3xl md:text-4xl tracking-tight mb-2 text-primary text-shadow-2xs")}>{children}</h1>;
};

export default H1;
