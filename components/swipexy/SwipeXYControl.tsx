"use client";

import React, { ReactNode, useEffect, useRef } from "react";

interface SwipeXYControlProps {
  xy: string;
  changeXY: (newXY: string) => void;
  children: ReactNode;
}

export const SwipeXYControl: React.FC<SwipeXYControlProps> = ({
  xy,
  changeXY,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentX, currentY] = xy.split("/").map(Number);

  useEffect(() => {
    if (containerRef.current) {
      const yPosition = currentY * window.innerHeight;
      containerRef.current.scrollTo({
        top: yPosition,
        behavior: "smooth",
      });
    }
  }, [currentY]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollY = target.scrollTop;
    const viewportHeight = window.innerHeight;
    const newY = Math.round(scrollY / viewportHeight);

    if (newY !== currentY) {
      changeXY(`${currentX}/${newY}`);
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {children}
    </div>
  );
};
