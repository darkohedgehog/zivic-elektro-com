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
        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.75rem] border border-white/10 bg-[#2b2d4a] text-[#f2e9e4]/45">
          <div className="text-center">
            <PackageSearch className="mx-auto h-12 w-12" />
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#9a8c98]">
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
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#2b2d4a]">
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
            <div className="rounded-full border border-white/10 bg-[#22223b]/72 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#c9ada7] backdrop-blur-md">
              Vizuelni pregled
            </div>

            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f2e9e4]/78 backdrop-blur-md">
              {activeIndex + 1} / {images.length}
            </div>
          </div>

          {canNavigate ? (
            <>
              <button
                type="button"
                aria-label="Prikažite prethodnu sliku"
                onClick={goToPreviousImage}
                className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#22223b]/72 text-[#f2e9e4] backdrop-blur-md transition duration-200 hover:bg-[#2b2d4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9ada7] sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Prikažite sledeću sliku"
                onClick={goToNextImage}
                className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#22223b]/72 text-[#f2e9e4] backdrop-blur-md transition duration-200 hover:bg-[#2b2d4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9ada7] sm:right-4"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}

          <button
            type="button"
            onClick={() => openLightbox(activeIndex)}
            aria-label={`Otvorite galeriju za proizvod ${productName}`}
            className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c9ada7]"
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

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-[#111322]/82 via-[#111322]/34 to-transparent p-4 sm:p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#9a8c98]">
                  Fullscreen viewer
                </p>
                <p className="mt-2 text-sm font-medium text-[#f2e9e4] sm:text-base">
                  Kliknite za detaljniji pregled slike
                </p>
              </div>

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[#f2e9e4] backdrop-blur-md">
                <Expand className="h-5 w-5" />
              </div>
            </div>
          </button>
        </div>

        {images.length > 1 ? (
          <div className="mt-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-[#f2e9e4] ring-1 ring-white/10">
                <Images className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#f2e9e4]">Galerija slika</p>
                <p className="text-sm text-[#f2e9e4]/60">
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
                    className={`relative h-22 w-22 shrink-0 overflow-hidden rounded-3xl border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9ada7] sm:h-24 sm:w-24 ${
                      isActive
                        ? "border-[#c9ada7] ring-2 ring-[#c9ada7]/40"
                        : "border-white/10 opacity-80 hover:opacity-100"
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
