"use client";

import { Fragment, useState } from "react";

type Row = {
  product: string;
  category: string;
  rate: number;
  median: number;
  photos: number;
  sizeGuide: boolean;
  description: number;
  image?: string;
};

const rows: Row[] = [
  { product: "Urban Runner Mono", category: "Men's Shoes", rate: 42, median: 28, photos: 2, sizeGuide: false, description: 45, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" },
  { product: "City Boot Classic", category: "Men's Shoes", rate: 38, median: 28, photos: 4, sizeGuide: false, description: 60, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&h=200&fit=crop" },
  { product: "Court Classic Low", category: "Men's Shoes", rate: 36, median: 28, photos: 3, sizeGuide: true, description: 80, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&h=200&fit=crop" },
  { product: "Trail Pro GTX", category: "Men's Shoes", rate: 31, median: 28, photos: 5, sizeGuide: true, description: 110, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop" },
  { product: "Loafer Mono Suede", category: "Men's Shoes", rate: 24, median: 28, photos: 6, sizeGuide: true, description: 130, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&h=200&fit=crop" },
];

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full h-1.5 bg-[#E0DDD8] rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

function ExpandedPanel({ row }: { row: Row }) {
  const photosOk = row.photos >= 5;
  return (
    <div className="bg-[#EEE9E3] border-t border-[#E0DDD8] p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 className={`text-[11px] uppercase tracking-[0.1em] font-bold ${photosOk ? "text-[#2D7A3A]" : "text-[#CC1818]"}`}>
          Photos {photosOk ? "✓" : "⚠"}
        </h4>
        <p className="text-sm text-[#1C1C1C] mt-2 mb-3">You have {row.photos} photos. We recommend at least 5.</p>
        <ProgressBar value={row.photos} max={5} color={photosOk ? "#2D7A3A" : "#CC1818"} />
        <button className="mt-4 border border-[#1C1C1C] text-[#1C1C1C] text-[11px] uppercase tracking-[0.1em] font-semibold px-4 py-2 rounded-full hover:bg-[#1C1C1C] hover:text-white transition-colors">
          Add Photos
        </button>
      </div>
      <div>
        <h4 className={`text-[11px] uppercase tracking-[0.1em] font-bold ${row.sizeGuide ? "text-[#2D7A3A]" : "text-[#CC1818]"}`}>
          Size Guide {row.sizeGuide ? "✓" : "⚠"}
        </h4>
        <p className="text-sm text-[#1C1C1C] mt-2 mb-4">
          {row.sizeGuide ? "Size guide present. Good job!" : "No size guide found. Products with size guides have 18% lower return rates."}
        </p>
        <button className="border border-[#1C1C1C] text-[#1C1C1C] text-[11px] uppercase tracking-[0.1em] font-semibold px-4 py-2 rounded-full hover:bg-[#1C1C1C] hover:text-white transition-colors">
          {row.sizeGuide ? "Edit Size Guide" : "Add Size Guide"}
        </button>
      </div>
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.1em] font-bold text-[#1C1C1C]">Description</h4>
        <p className="text-sm text-[#1C1C1C] mt-2 mb-3">
          Your description is {row.description} words. Detailed descriptions (100+ words) reduce returns by 9%.
        </p>
        <ProgressBar value={row.description} max={100} color={row.description >= 100 ? "#2D7A3A" : "#B8860B"} />
        <button className="mt-4 border border-[#1C1C1C] text-[#1C1C1C] text-[11px] uppercase tracking-[0.1em] font-semibold px-4 py-2 rounded-full hover:bg-[#1C1C1C] hover:text-white transition-colors">
          Improve Description
        </button>
      </div>
    </div>
  );
}

export function TopReturnsTable() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-white border border-[#E0DDD8] rounded-sm p-7">
      <h3 className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#1C1C1C]">Top Return Rate Products</h3>
      <p className="text-sm text-[#6B6B6B] mt-1 mb-6">Products driving your above-average return rate</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B] border-b border-[#E0DDD8]">
              {["Photo", "Product", "Category", "Return Rate", "vs Median", "Photos", "Size Guide", ""].map((h, i) => (
                <th key={i} className={`py-3 pr-4 font-semibold ${i === 7 ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const diff = r.rate - r.median;
              const isOpen = expanded === r.product;
              return (
                <Fragment key={r.product}>
                  <tr className="border-b border-[#E0DDD8] last:border-0">
                    <td className="py-5 pr-4">
                      {r.image ? (
                        <img src={r.image} alt={r.product} className="w-12 h-12 object-cover rounded-sm border border-[#E0DDD8]" />
                      ) : (
                        <div className="w-12 h-12 rounded-sm border border-[#E0DDD8] bg-[#F2EEE8]" />
                      )}
                    </td>
                    <td className="py-5 pr-4 font-semibold text-[#1C1C1C]">{r.product}</td>
                    <td className="py-5 pr-4 text-[#6B6B6B]">{r.category}</td>
                    <td className="py-5 pr-4 font-semibold text-[#1C1C1C]">{r.rate}%</td>
                    <td className={`py-5 pr-4 font-semibold ${diff > 0 ? "text-[#CC1818]" : "text-[#2D7A3A]"}`}>
                      {diff > 0 ? "+" : ""}{diff}pp
                    </td>
                    <td className={`py-5 pr-4 font-semibold ${r.photos < 3 ? "text-[#CC1818]" : "text-[#1C1C1C]"}`}>{r.photos}</td>
                    <td className={`py-5 pr-4 font-semibold ${r.sizeGuide ? "text-[#2D7A3A]" : "text-[#CC1818]"}`}>
                      {r.sizeGuide ? "Yes" : "No"}
                    </td>
                    <td className="py-5 text-right">
                      <button
                        onClick={() => setExpanded(isOpen ? null : r.product)}
                        className="bg-[#1C1C1C] text-white text-[10px] tracking-[0.1em] font-semibold px-4 py-2 rounded-full hover:opacity-90"
                      >
                        {isOpen ? "CLOSE ✕" : "IMPROVE OFFER"}
                      </button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-[#E0DDD8] last:border-0">
                      <td colSpan={8} className="p-0">
                        <ExpandedPanel row={r} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
