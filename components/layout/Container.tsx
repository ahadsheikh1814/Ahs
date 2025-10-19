import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <main className={cn(className,"max-w-3xl mx-auto w-full px-5")}>{children}</main>;
};

export default Container;
