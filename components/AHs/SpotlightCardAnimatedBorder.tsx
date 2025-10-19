"use client"
import { motion, useMotionTemplate, useMotionValue } from "motion/react"
import type { MouseEvent } from "react"

export default function SpotlightCardAnimatedBorder({children}:{children:React.ReactNode}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className="group relative max-w-md rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-px shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.6),
              rgba(6, 182, 212, 0.3) 40%,
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  )
}
