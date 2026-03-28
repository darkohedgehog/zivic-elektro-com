"use client";

import { useState } from "react";

export function useImageGallery(imageCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  function clampIndex(index: number) {
    if (imageCount === 0) return 0;
    return ((index % imageCount) + imageCount) % imageCount;
  }

  function selectImage(index: number) {
    setActiveIndex(clampIndex(index));
  }

  function openLightbox(index = activeIndex) {
    setActiveIndex(clampIndex(index));
    setIsLightboxOpen(true);
  }

  function closeLightbox() {
    setIsLightboxOpen(false);
  }

  function goToNextImage() {
    setActiveIndex((current) => clampIndex(current + 1));
  }

  function goToPreviousImage() {
    setActiveIndex((current) => clampIndex(current - 1));
  }

  return {
    activeIndex,
    isLightboxOpen,
    selectImage,
    openLightbox,
    closeLightbox,
    goToNextImage,
    goToPreviousImage,
  };
}
