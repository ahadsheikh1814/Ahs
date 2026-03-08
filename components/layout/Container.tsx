import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn(className, "mx-auto min-h-screen w-full max-w-3xl px-5")}
    >
      {children}
    </main>
  );
};

export default Container;
