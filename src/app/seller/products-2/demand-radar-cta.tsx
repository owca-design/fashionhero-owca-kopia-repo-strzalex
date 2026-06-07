"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { track } from "@/lib/track";

export function DemandRadarCta({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        track("seller_demand_radar_clicked", { source: "products-2" });
        router.push("/seller/products-2/report");
      }}
      className={`inline-flex items-center gap-2 px-5 h-11 bg-[#1C1C1C] text-white text-[11px] font-semibold tracking-[0.1em] uppercase rounded-lg hover:bg-black transition-colors ${className}`}
    >
      Pokaż pełny raport popytu
      <ArrowUpRight size={14} />
    </button>
  );
}
