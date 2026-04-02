"use client";

import { DotLottie } from "@lottiefiles/dotlottie-web";
import { useEffect, useRef } from "react";

export function DotLottieCanvas({
  src,
  ariaLabel,
}: {
  src: string;
  ariaLabel: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const dotLottie = new DotLottie({
      canvas: canvasRef.current,
      src,
      autoplay: true,
      loop: true,
      renderConfig: {
        autoResize: true,
      },
    });

    return () => {
      dotLottie.destroy();
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={ariaLabel}
      className="h-full w-full"
    />
  );
}
