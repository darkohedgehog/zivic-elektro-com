"use client";

import { DotLottieCanvas } from "@/components/shared/DotLottieCanvas";

export function HeroLottie() {
  return (
    <div className="relative aspect-square min-h-80 w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(240,235,216,0.08),transparent_45%),linear-gradient(180deg,rgba(62,92,118,0.18),rgba(29,45,68,0.12))] sm:min-h-105">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,235,216,0.08),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(116,140,171,0.16),transparent_26%),radial-gradient(circle_at_70%_80%,rgba(62,92,118,0.16),transparent_28%)]" />

      <div className="absolute inset-0 p-4 sm:p-6">
        <DotLottieCanvas
          src="/assets/OnlineBusiness.lottie"
          ariaLabel="Ilustracija poslovne suradnje i korporativne podrške"
        />
      </div>
    </div>
  );
}
