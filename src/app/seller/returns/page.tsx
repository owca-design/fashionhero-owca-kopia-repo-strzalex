import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { KpiCard } from "@/components/seller/KpiCard";
import { ReturnRateChart } from "@/components/seller/ReturnRateChart";
import { TopReturnsTable } from "@/components/seller/TopReturnsTable";
import { TipCard } from "@/components/seller/TipCard";

export const metadata = { title: "Return Rate Dashboard — FashionHero Seller" };

export default function ReturnsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12">
      {/* Breadcrumb */}
      <p className="text-[11px] uppercase tracking-[0.1em] text-[#6B6B6B]">
        <Link href="/seller" className="hover:text-[#1C1C1C]">Seller Panel</Link>
        <span className="mx-2">/</span>
        <span>Analytics</span>
        <span className="mx-2">/</span>
        <span className="text-[#1C1C1C]">Return Rate</span>
      </p>

      {/* Header */}
      <div className="mt-8">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[#6B6B6B] font-semibold">Your Performance</p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] tracking-tight mt-2">Return Rate Dashboard</h1>
        <p className="text-sm text-[#6B6B6B] mt-2">UrbanEdge · Last updated: May 2026</p>
      </div>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        <KpiCard label="Your Return Rate" value="34%" footer="▼ 2% vs last month" footerTone="success" />
        <KpiCard label="Category Median" value="28%" footer="Men's Shoes" />
        <KpiCard
          label="Your Status"
          badge={
            <span className="inline-flex items-center gap-2 bg-[#FFF3D6] text-[#B8860B] text-xs font-bold tracking-[0.1em] uppercase px-3 py-2 rounded-sm">
              <AlertTriangle className="w-4 h-4" /> Above Average
            </span>
          }
          footer="You are 6pp above category median"
        />
      </section>

      {/* Chart */}
      <section className="mt-12">
        <ReturnRateChart />
      </section>

      {/* Table */}
      <section className="mt-12">
        <TopReturnsTable />
      </section>

      {/* Tips */}
      <section className="mt-20">
        <h2 className="text-[12px] uppercase tracking-[0.1em] font-semibold text-[#1C1C1C] text-center">
          How to Reduce Returns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <TipCard emoji="📏" title="Add Size Guide" text="Products with size guides have 18% lower return rates." />
          <TipCard emoji="📸" title="Add More Photos" text="5+ photos reduce returns by 12%." />
          <TipCard emoji="📝" title="Improve Description" text="Detailed material info reduces size-related returns." />
        </div>
      </section>
    </div>
  );
}
