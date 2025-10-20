"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";

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
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down" | null>(null);

  // Hole Slide-Info
  const getSlideInfo = (slideIndex: number) => {
    if (!containerRef.current) return null;
    const slides = containerRef.current.children;
    if (slideIndex < 0 || slideIndex >= slides.length) return null;

    const slide = slides[slideIndex] as HTMLElement;
    return {
      slideTop: slide.offsetTop,
      slideHeight: slide.offsetHeight,
    };
  };

  // Scrolle zu einer bestimmten Slide
  const scrollToSlide = (
    slideIndex: number,
    direction: "up" | "down" | null
  ) => {
    if (!containerRef.current) return;

    const slideInfo = getSlideInfo(slideIndex);
    if (!slideInfo) return;

    const viewportHeight = window.innerHeight;
    let scrollPosition: number;

    if (direction === "down") {
      // Nach unten: view top am Anfang der Slide
      scrollPosition = slideInfo.slideTop;
    } else if (direction === "up") {
      // Nach oben: view bottom am Ende der Slide
      scrollPosition =
        slideInfo.slideTop + slideInfo.slideHeight - viewportHeight;
    } else {
      // Default: Anfang der Slide
      scrollPosition = slideInfo.slideTop;
    }

    isScrollingRef.current = true;
    containerRef.current.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  // Reagiere auf xy-Änderungen (z.B. durch Navbar)
  useEffect(() => {
    scrollToSlide(currentY, scrollDirectionRef.current);
  }, [currentY]);

  // Wheel Event Handler
  const canElementScroll = (el: Element | null, direction: "up" | "down") => {
    if (!el) return false;
    const target = el as HTMLElement;
    const style = window.getComputedStyle(target);
    const overflowY = style.overflowY;
    const isScrollable = overflowY === "auto" || overflowY === "scroll";
    if (!isScrollable) return false;
    if (direction === "down") {
      return target.scrollTop + target.clientHeight < target.scrollHeight - 1;
    }
    return target.scrollTop > 1;
  };

  const findScrollableAncestor = (start: Element | null) => {
    let el = start as Element | null;
    const root = containerRef.current;
    while (el && el !== root && el !== document.body) {
      if (canElementScroll(el, "down") || canElementScroll(el, "up")) return el;
      el = el.parentElement;
    }
    // fallback: check the slide inner container if present
    const slide = containerRef.current?.children[currentY] as
      | HTMLElement
      | undefined;
    const inner = slide?.querySelector(".swipe-slide-inner");
    if (inner) return inner;
    return null;
  };

  const handleWheel = (e: WheelEvent) => {
    if (isScrollingRef.current) {
      e.preventDefault();
      return;
    }

    const direction = e.deltaY > 0 ? "down" : "up";

    // If the event target or any ancestor can still scroll in the
    // direction of the wheel, let the inner scroll happen and don't
    // change slides.
    const scrollable = findScrollableAncestor(e.target as Element | null);
    if (scrollable) {
      if (canElementScroll(scrollable, direction)) {
        // allow default scrolling
        return;
      }
    }

    const totalSlides = containerRef.current?.children.length || 0;
    let newY = currentY;

    if (direction === "down" && currentY < totalSlides - 1) {
      newY = currentY + 1;
      scrollDirectionRef.current = "down";
    } else if (direction === "up" && currentY > 0) {
      newY = currentY - 1;
      scrollDirectionRef.current = "up";
    }

    if (newY !== currentY) {
      e.preventDefault();
      changeXY(`${currentX}/${newY}`);
    }
  };

  // Touch Event Handlers
  const handleTouchStart = (e: TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isScrollingRef.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;
    const threshold = 50;

    if (Math.abs(diff) < threshold) return;

    const direction = diff > 0 ? "down" : "up";
    const totalSlides = containerRef.current?.children.length || 0;

    let newY = currentY;
    // For touch we also check inner scrollable element: if it can scroll
    // in the same direction, let it handle the touch gesture.
    const touchTarget = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );
    const scrollable = findScrollableAncestor(touchTarget);
    if (scrollable && canElementScroll(scrollable, direction)) {
      return;
    }

    if (direction === "down" && currentY < totalSlides - 1) {
      newY = currentY + 1;
      scrollDirectionRef.current = "down";
    } else if (direction === "up" && currentY > 0) {
      newY = currentY - 1;
      scrollDirectionRef.current = "up";
    }

    if (newY !== currentY) {
      e.preventDefault();
      changeXY(`${currentX}/${newY}`);
    }
  };

  // Event Listeners hinzufügen/entfernen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentY, currentX]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};
