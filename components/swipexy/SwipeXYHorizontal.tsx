"use client";

import React, { ReactNode } from "react";

interface SwipeXYHorizontalProps {
  children: ReactNode;
}

export const SwipeXYHorizontal: React.FC<SwipeXYHorizontalProps> = ({
  children,
}) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        scrollSnapAlign: "start",
      }}
    >
      {children}
    </div>
  );
};
