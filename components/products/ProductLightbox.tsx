"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ProductGalleryImage = {
  id: number;
  src: string;
  alt?: string;
};

const SHIMMER_DATA_URL = createShimmerDataUrl();

export function ProductLightbox({
  images,
  productName,
  activeIndex,
  isOpen,
  loadedImageSources,
  onClose,
  onNext,
  onPrevious,
  onSelect,
  onImageLoad,
}: {
  images: ProductGalleryImage[];
  productName: string;
  activeIndex: number;
  isOpen: boolean;
  loadedImageSources: Set<string>;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (index: number) => void;
  onImageLoad: (src: string) => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const activeImage = images[activeIndex];
  const canNavigate = images.length > 1;

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === "ArrowRight" && canNavigate) {
      event.preventDefault();
      onNext();
      return;
    }

    if (event.key === "ArrowLeft" && canNavigate) {
      event.preventDefault();
      onPrevious();
      return;
    }

    if (event.key !== "Tab") return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  });

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen]);

  if (!activeImage) {
    return null;
  }

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (!canNavigate || !touchStartRef.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    touchStartRef.current = null;

    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) {
      return;
    }

    if (deltaX < 0) {
      onNext();
      return;
    }

    onPrevious();
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[90] bg-[#0f1121]/94 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={handleOverlayClick}
        >
          <div className="flex min-h-screen items-center justify-center p-3 sm:p-5 lg:p-8">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Galerija proizvoda ${productName}`}
              className="relative flex h-[min(92vh,960px)] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(34,34,59,0.96),rgba(21,23,40,0.98))] shadow-[0_32px_120px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, scale: 0.985, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 16 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#9a8c98]">
                    Pregled slika
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#f2e9e4] sm:text-base">
                    {productName}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#f2e9e4]/72">
                    {activeIndex + 1} / {images.length}
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Zatvorite galeriju"
                    onClick={onClose}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f2e9e4] transition duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9ada7]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative flex min-h-0 flex-1 flex-col">
                {canNavigate ? (
                  <>
                    <button
                      type="button"
                      aria-label="Prikažite prethodnu sliku"
                      onClick={onPrevious}
                      className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#22223b]/72 text-[#f2e9e4] backdrop-blur-md transition duration-200 hover:bg-[#2b2d4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9ada7] sm:left-5"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      aria-label="Prikažite sledeću sliku"
                      onClick={onNext}
                      className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#22223b]/72 text-[#f2e9e4] backdrop-blur-md transition duration-200 hover:bg-[#2b2d4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9ada7] sm:right-5"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                ) : null}

                <div
                  className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-8 sm:py-6"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  style={{ touchAction: "pan-y" }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${activeImage.id}-${activeIndex}`}
                      className="relative h-full w-full"
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      {!loadedImageSources.has(activeImage.src) ? (
                        <div className="absolute inset-0 rounded-[1.5rem] bg-[linear-gradient(110deg,rgba(255,255,255,0.05),rgba(255,255,255,0.12),rgba(255,255,255,0.05))] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]" />
                      ) : null}

                      <Image
                        src={activeImage.src}
                        alt={activeImage.alt || productName}
                        fill
                        priority
                        sizes="100vw"
                        className="object-contain"
                        placeholder="blur"
                        blurDataURL={SHIMMER_DATA_URL}
                        onLoad={() => onImageLoad(activeImage.src)}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {images.length > 1 ? (
                  <div className="border-t border-white/10 px-4 py-4 sm:px-6">
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {images.map((image, index) => {
                        const isActive = index === activeIndex;

                        return (
                          <button
                            key={image.id}
                            type="button"
                            aria-label={`Prikažite sliku ${index + 1}`}
                            aria-pressed={isActive}
                            onClick={() => onSelect(index)}
                            className={`relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9ada7] sm:h-20 sm:w-20 ${
                              isActive
                                ? "border-[#c9ada7] ring-2 ring-[#c9ada7]/40"
                                : "border-white/10 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt || `${productName} ${index + 1}`}
                              fill
                              sizes="80px"
                              className="object-cover"
                              placeholder="blur"
                              blurDataURL={SHIMMER_DATA_URL}
                              onLoad={() => onImageLoad(image.src)}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function createShimmerDataUrl() {
  const svg = `
    <svg width="1200" height="900" viewBox="0 0 1200 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="900" fill="#22223b"/>
      <rect width="1200" height="900" fill="url(#paint0_linear_0_1)"/>
      <defs>
        <linearGradient id="paint0_linear_0_1" x1="-120" y1="0" x2="1320" y2="0" gradientUnits="userSpaceOnUse">
          <stop stop-color="#22223b"/>
          <stop offset="0.5" stop-color="#4a4e69"/>
          <stop offset="1" stop-color="#22223b"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
