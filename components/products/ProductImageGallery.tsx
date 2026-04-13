"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, Images, PackageSearch } from "lucide-react";
import { ProductLightbox } from "@/components/products/ProductLightbox";
import { useImageGallery } from "@/components/products/useImageGallery";

type ProductGalleryImage = {
  id: number;
  src: string;
  alt?: string;
};

const SHIMMER_DATA_URL = createShimmerDataUrl();

export function ProductImageGallery({
  images,
  productName,
}: {
  images: ProductGalleryImage[];
  productName: string;
}) {
  const {
    activeIndex,
    isLightboxOpen,
    selectImage,
    openLightbox,
    closeLightbox,
    goToNextImage,
    goToPreviousImage,
  } = useImageGallery(images.length);
  const [loadedImageSources, setLoadedImageSources] = useState<Set<string>>(
    () => new Set(),
  );
  const preloadedImageSourcesRef = useRef<Set<string>>(new Set());

  const activeImage = images[activeIndex];
  const canNavigate = images.length > 1;

  useEffect(() => {
    if (images.length <= 1) return;

    preloadImage(images, activeIndex + 1, preloadedImageSourcesRef.current);
    preloadImage(images, activeIndex - 1, preloadedImageSourcesRef.current);
  }, [activeIndex, images]);

  function markImageAsLoaded(src: string) {
    setLoadedImageSources((current) => {
      if (current.has(src)) {
        return current;
      }

      const next = new Set(current);
      next.add(src);
      return next;
    });
  }

  if (images.length === 0 || !activeImage) {
    return (
      <div className="surface-panel overflow-hidden rounded-4xl p-4 sm:p-5">
        <div className="theme-media-frame flex aspect-[4/3] items-center justify-center rounded-[1.75rem]">
          <div className="text-center">
            <PackageSearch className="mx-auto h-12 w-12" />
            <p className="theme-label mt-4 text-sm uppercase tracking-[0.18em]">
              Slika nije dostupna
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="surface-panel overflow-hidden rounded-4xl p-4 sm:p-5">
        <div className="theme-media-shell relative overflow-hidden rounded-[1.75rem]">
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
            <div className="theme-chip-overlay theme-label px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
              Vizualni pregled
            </div>

            <div className="theme-chip-overlay-muted theme-body px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
              {activeIndex + 1} / {images.length}
            </div>
          </div>

          {canNavigate ? (
            <>
              <button
                type="button"
                aria-label="Prikažite prethodnu sliku"
                onClick={goToPreviousImage}
                className="theme-action-icon absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Prikažite sljedeću sliku"
                onClick={goToNextImage}
                className="theme-action-icon absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full sm:right-4"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}

          <button
            type="button"
            onClick={() => openLightbox(activeIndex)}
            aria-label={`Otvorite galeriju za proizvod ${productName}`}
            className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#748CAB]"
          >
            {!loadedImageSources.has(activeImage.src) ? (
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.04),rgba(255,255,255,0.12),rgba(255,255,255,0.04))] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]" />
            ) : null}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeImage.id}-${activeIndex}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.992 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt || productName}
                  fill
                  priority={activeIndex === 0}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  placeholder="blur"
                  blurDataURL={SHIMMER_DATA_URL}
                  onLoad={() => markImageAsLoaded(activeImage.src)}
                />
              </motion.div>
            </AnimatePresence>

            <div className="theme-image-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
              <div>
                <p className="theme-label text-xs uppercase tracking-[0.18em]">
                  Puni prikaz
                </p>
                <p className="theme-heading mt-2 text-sm font-medium sm:text-base">
                  Kliknite za detaljniji pregled slike
                </p>
              </div>

              <div className="theme-chip-overlay-muted inline-flex h-12 w-12 items-center justify-center rounded-full theme-heading">
                <Expand className="h-5 w-5" />
              </div>
            </div>
          </button>
        </div>

        {images.length > 1 ? (
          <div className="mt-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="theme-card-surface theme-heading flex h-9 w-9 items-center justify-center rounded-xl">
                <Images className="h-4 w-4" />
              </div>
              <div>
                <p className="theme-heading text-sm font-semibold">Galerija slika</p>
                <p className="theme-body-muted text-sm">
                  Horizontalni pregled svih dostupnih vizuala proizvoda.
                </p>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={image.id}
                    type="button"
                    aria-label={`Odaberite sliku ${index + 1}`}
                    aria-pressed={isActive}
                    onClick={() => selectImage(index)}
                    className={`relative h-22 w-22 shrink-0 overflow-hidden rounded-3xl border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#748CAB] sm:h-24 sm:w-24 ${
                      isActive
                        ? "border-[#748CAB] ring-2 ring-[#748CAB]/35"
                        : "border-[color:var(--border-soft)] opacity-80 hover:opacity-100"
                    }`}
                  >
                    {!loadedImageSources.has(image.src) ? (
                      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.04),rgba(255,255,255,0.12),rgba(255,255,255,0.04))] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]" />
                    ) : null}

                    <Image
                      src={image.src}
                      alt={image.alt || `${productName} ${index + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={SHIMMER_DATA_URL}
                      onLoad={() => markImageAsLoaded(image.src)}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <ProductLightbox
        images={images}
        productName={productName}
        activeIndex={activeIndex}
        isOpen={isLightboxOpen}
        loadedImageSources={loadedImageSources}
        onClose={closeLightbox}
        onNext={goToNextImage}
        onPrevious={goToPreviousImage}
        onSelect={selectImage}
        onImageLoad={markImageAsLoaded}
      />
    </>
  );
}

function preloadImage(
  images: ProductGalleryImage[],
  index: number,
  preloadedImageSources: Set<string>,
) {
  if (images.length === 0) return;

  const normalizedIndex = ((index % images.length) + images.length) % images.length;
  const nextImage = images[normalizedIndex];

  if (!nextImage || preloadedImageSources.has(nextImage.src)) {
    return;
  }

  const preloadTarget = new globalThis.Image();
  preloadTarget.src = nextImage.src;
  preloadedImageSources.add(nextImage.src);
}

function createShimmerDataUrl() {
  const svg = `
    <svg width="1200" height="900" viewBox="0 0 1200 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="900" fill="#0D1321"/>
      <rect width="1200" height="900" fill="url(#paint0_linear_0_1)"/>
      <defs>
        <linearGradient id="paint0_linear_0_1" x1="-120" y1="0" x2="1320" y2="0" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0D1321"/>
          <stop offset="0.5" stop-color="#3E5C76"/>
          <stop offset="1" stop-color="#0D1321"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
