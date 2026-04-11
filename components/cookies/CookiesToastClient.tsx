"use client";

import dynamic from "next/dynamic";

const CookiesToast = dynamic(() => import("./CookiesToast"), {
  ssr: false,
});

export default function CookiesToastClient() {
  return <CookiesToast />;
}
