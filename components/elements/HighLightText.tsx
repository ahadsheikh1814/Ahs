import React from "react";

const HighLightText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="bg-accent relative w-fit p-1 text-sm font-semibold tracking-wide">
      {children}
      <Dots />
    </p>
  );
};

export default HighLightText;

const Dots = () => {
  return (
    <>
      <span className="bg-accent-foreground absolute -top-[1px] -left-[1px] inline-block h-[3px] w-[3px] rounded-full p-px" />
      <span className="bg-accent-foreground absolute -top-[1px] -right-[1px] inline-block h-[3px] w-[3px] rounded-full p-px" />
      <span className="bg-accent-foreground absolute -bottom-[1px] -left-[1px] inline-block h-[3px] w-[3px] rounded-full p-px" />
      <span className="bg-accent-foreground absolute -right-[1px] -bottom-[1px] inline-block h-[3px] w-[3px] rounded-full p-px" />
    </>
  );
};
