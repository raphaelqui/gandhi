"use client";

import React, { ReactNode } from "react";

interface SwipeXYElementProps {
  children: ReactNode;
  onc?: string;
  startX?: boolean;
}

export const SwipeXYElement: React.FC<SwipeXYElementProps> = ({
  children,
  onc,
  startX,
}) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      {children}
    </div>
  );
};
