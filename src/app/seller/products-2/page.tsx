import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { demandQueries, demandSummary, demandCategory, demandWindowLabel } from "@/data/demandRadar";
import { Sparkles, Info, Radar, TrendingUp, TrendingDown, Lock, Search } from "lucide-react";
import { DemandRadarCta } from "./demand-radar-cta";

const sellerProducts = products.filter((p) => p.sellerId === "s1");

function deterministicViews(id: string): number {
  const n = parseInt(id, 10) || id.charCodeAt(0);
  return ((n * 1471 + 337) % 2800) + 120;
}

const teaserQueries = demandQueries.slice(0, 5);
const hiddenCount = demandQueries.length - teaserQueries.length;
const fmt = (n: number) => n.toLocaleString("pl-PL");

export default function SellerProducts2Page() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase mb-8">
        <span>Seller Panel</span>
        <span>/</span>
        <span>Catalog</span>
        <span>/</span>
        <span className="text-[#1C1C1C]">Products 2.0</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase mb-1">
          Your Catalog
        </p>
        <h1 className="text-4xl font-bold text-[#1C1C1C] tracking-tight mb-1">Products 2.0</h1>
        <p className="text-sm text-[#6B6B6B]">
          UrbanEdge · {sellerProducts.length} products
        </p>
      </div>

      {/* ===================== DEMAND RADAR (fake door) ===================== */}
      <section className="mb-12 bg-white rounded-xl border border-[#E0DAD0] overflow-hidden">
        {/* Radar header */}
        <div className="px-6 pt-6 pb-5 border-b border-[#E0DAD0]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Radar size={18} className="text-[#1C1C1C]" />
                <h2 className="text-[13px] font-bold tracking-[0.12em] text-[#1C1C1C] uppercase">Demand Radar</h2>
                <span className="text-[10px] font-bold tracking-wider text-white bg-[#1E7C3A] rounded px-1.5 py-0.5 uppercase">
                  Nowość
                </span>
              </div>
              <p className="text-sm text-[#3C3C3C] max-w-xl leading-relaxed">
                Czego kupujący szukają w kategorii <strong>{demandCategory}</strong> — a czego nie ma w Twojej ofercie.
                Dane z wyszukiwarki FashionHero, {demandWindowLabel}.
              </p>
            </div>
          </div>

          {/* KPI row */}
          <div className="mt-5 grid sm:grid-cols-3 gap-3">
            <div className="bg-[#F5F4F1] rounded-lg p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#6B6B6B] uppercase">
                <Search size={12} /> Zapytań w kategorii
              </div>
              <div className="text-2xl font-bold text-[#1C1C1C] mt-1">{fmt(demandSummary.totalSearches)}</div>
              <div className="text-[11px] text-[#6B6B6B]">{demandWindowLabel}</div>
            </div>
            <div className="bg-[#FBF1EC] rounded-lg p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#A4421E] uppercase">
                <Info size={12} /> Nisz bez Twojej oferty
              </div>
              <div className="text-2xl font-bold text-[#A4421E] mt-1">{demandSummary.gapCount}</div>
              <div className="text-[11px] text-[#6B6B6B]">popyt, którego nie łapiesz</div>
            </div>
            <div className="bg-[#FBF1EC] rounded-lg p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#A4421E] uppercase">
                <TrendingUp size={12} /> Szac. utracony popyt
              </div>
              <div className="text-2xl font-bold text-[#A4421E] mt-1">{fmt(demandSummary.lostDemandPln)} zł</div>
              <div className="text-[11px] text-[#6B6B6B]">tygodniowo, w niszach bez oferty</div>
            </div>
          </div>
        </div>

        {/* Demand table (teaser) */}
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E0DAD0]">
                {["Czego szukają kupujący", "Zapytań / tydz.", "Trend", "Status"].map((col) => (
                  <th key={col} className="px-6 py-3 text-left text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teaserQueries.map((q, i) => (
                <tr
                  key={q.query}
                  className={`border-b border-[#E0DAD0] last:border-0 ${i % 2 === 1 ? "bg-[#FAFAF9]" : ""}`}
                >
                  <td className="px-6 py-3.5">
                    <span className="text-[#1C1C1C] font-medium">{q.query}</span>
                  </td>
                  <td className="px-6 py-3.5 text-[#1C1C1C]">{fmt(q.searches)}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center gap-1 font-semibold ${q.trend >= 0 ? "text-[#1E7C3A]" : "text-[#A4421E]"}`}>
                      {q.trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                      {q.trend > 0 ? "+" : ""}{q.trend}%
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    {q.inCatalog ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider bg-green-50 text-green-700 border border-green-200 uppercase">
                        Masz to
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider bg-[#FBF1EC] text-[#A4421E] border border-[#EBD3C7] uppercase">
                        Brak w ofercie
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Locked full report → CTA (fake door) */}
          <div className="relative">
            {/* blurred faux-rows behind the lock */}
            <div className="px-6 py-4 space-y-3 blur-[3px] select-none pointer-events-none" aria-hidden>
              {[0, 1, 2].map((r) => (
                <div key={r} className="flex items-center gap-4">
                  <div className="h-3 rounded bg-[#E6E1D9]" style={{ width: `${40 - r * 6}%` }} />
                  <div className="h-3 w-12 rounded bg-[#E6E1D9]" />
                  <div className="h-3 w-12 rounded bg-[#E6E1D9]" />
                  <div className="h-3 w-20 rounded bg-[#E6E1D9]" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="w-9 h-9 rounded-full bg-[#1C1C1C] flex items-center justify-center mb-3">
                <Lock size={16} className="text-white" />
              </div>
              <p className="text-sm font-semibold text-[#1C1C1C]">
                Jeszcze {hiddenCount} nisz z popytem czeka w pełnym raporcie
              </p>
              <p className="text-[12px] text-[#6B6B6B] mt-1 mb-4 max-w-md">
                Pełna lista zapytań, trendy 12-tygodniowe i szacowany popyt PLN per nisza — wiedza, której Forte nie ma, bo nie ma kupujących.
              </p>
              <DemandRadarCta />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== EXISTING CATALOG TABLE ===================== */}
      <p className="text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase mb-3">Twój katalog</p>
      <div className="bg-white rounded-xl border border-[#E0DAD0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E0DAD0]">
              {["Product", "Color", "Price", "Rating", "Views"].map((col) => (
                <th key={col} className="px-4 py-3 text-left text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase">
                  {col}
                </th>
              ))}
              <th className="px-4 py-3 text-left text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase">Visibility</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {sellerProducts.map((product, i) => {
              const color = product.colors[0];
              const views = deterministicViews(product.id);
              return (
                <tr
                  key={product.id}
                  className={`border-b border-[#E0DAD0] last:border-0 hover:bg-[#F5F4F1] transition-colors ${
                    i % 2 === 1 ? "bg-[#FAFAF9]" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#EEE9E3] shrink-0">
                        <Image src={color.image} alt={product.name} width={56} height={56} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold tracking-wider text-[#1C1C1C] uppercase">{product.name}</p>
                        <p className="text-[11px] text-[#6B6B6B] mt-0.5">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#1C1C1C]">{color.name}</td>
                  <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{product.price} zł</td>
                  <td className="px-4 py-3 text-[#1C1C1C]">
                    <span className="text-amber-500">★</span>{" "}{product.rating} ({product.reviewCount})
                  </td>
                  <td className="px-4 py-3 text-[#1C1C1C]">{views.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-semibold tracking-wider text-[#1C1C1C] uppercase">Public</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider bg-green-50 text-green-700 border border-green-200 uppercase">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-[11px] font-semibold tracking-wider text-[#6B6B6B] hover:text-[#1C1C1C] uppercase transition-colors"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[11px] text-[#6B6B6B] text-center flex items-center justify-center gap-1.5">
        <Sparkles size={12} /> Products 2.0 — prototyp Demand Radar. Dane popytowe demonstracyjne.
      </p>
    </div>
  );
}
