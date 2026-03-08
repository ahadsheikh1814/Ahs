"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

export default function CursorFollower() {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Offset slightly so cursor tip isn't hidden under the card
      mouseX.set(e.clientX + 12);
      mouseY.set(e.clientY + 12);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      // Fix: w-44 (valid Tailwind), overflow-hidden to clip image to rounded corners
      className="pointer-events-none fixed top-0 left-0 z-50 w-44"
    >
      {/* Fix: relative container with fixed height so image fills it properly */}
      <div className="relative h-52 w-full overflow-hidden rounded-lg rounded-tl-none shadow-lg">
        <Image
          src="https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/595156957_122152686476910455_883881248796474897_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFlaMqWbKvDx9oIam-VwZpPU3HJFC6gIJJTcckULqAgktvL9QVvl-aH41Hg2gGjLRVmTOpinOwUotYxLs2DsWuh&_nc_ohc=fmcemEAul_8Q7kNvwEdTmUA&_nc_oc=AdnoF4qfJZDC1vgEiDYL5DUy6Vg8gFI3xuiZJVDJs83P7TLAIrNaYZH9lC0GCUraens&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=TbiKHi298mb541i8WVMZPQ&_nc_ss=8&oh=00_Afz7OUeC6ID18BSqV-MLSvK8aL3-jyH9KCqWQPc4bT32-w&oe=69B2D8C4"
          alt="Ahad Sheikh"
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 400px"
        />
      </div>
      {/* Fix: rounded-tl-none to continue the top-left sharp corner theme */}
      <p className="bg-accent-foreground text-accent mt-1.5 rounded-xl rounded-tl-none px-3 py-1 text-sm font-medium shadow-sm">
        Ahad Sheikh
      </p>
    </motion.div>
  );
}
