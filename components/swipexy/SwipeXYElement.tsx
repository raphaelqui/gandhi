"use client";
import React, { ReactNode, HTMLAttributes } from "react";

interface SwipeXYElementProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onc?: string;
  startX?: boolean;
}

// Each slide gets its own inner scroll container. The container has
// overflow-y:auto and fills the viewport. The parent control will
// detect whether this inner container can scroll further and will
// only change slides when the inner scroll reaches its end.
export const SwipeXYElement: React.FC<SwipeXYElementProps> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <div
      className="swipe-slide"
      style={{
        width: "100%",
        height: "100vh",
        display: "block",
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      <div
        className="swipe-slide-inner"
        style={{
          height: "100%",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
    </div>
  );
};
