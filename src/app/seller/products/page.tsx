import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Sparkles, Info } from "lucide-react";

const sellerProducts = products.filter((p) => p.sellerId === "s1");

function deterministicViews(id: string): number {
  const n = parseInt(id, 10) || id.charCodeAt(0);
  return ((n * 1471 + 337) % 2800) + 120;
}

export default function SellerProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase mb-8">
        <span>Seller Panel</span>
        <span>/</span>
        <span>Catalog</span>
        <span>/</span>
        <span className="text-[#1C1C1C]">Products</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase mb-1">
          Your Catalog
        </p>
        <h1 className="text-4xl font-bold text-[#1C1C1C] tracking-tight mb-1">Products</h1>
        <p className="text-sm text-[#6B6B6B]">
          UrbanEdge · {sellerProducts.length} products
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E0DAD0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E0DAD0]">
              {["Product", "Color", "Price", "Rating", "Views"].map((col) => (
                <th key={col} className="px-4 py-3 text-left text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase">
                  {col}
                </th>
              ))}
              <th className="px-4 py-3 text-left text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase">Promote</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase">
                <span className="flex items-center gap-1">Visibility <Info size={12} /></span>
              </th>
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
                  {/* 1. Product */}
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

                  {/* 2. Color */}
                  <td className="px-4 py-3 text-[#1C1C1C]">{color.name}</td>

                  {/* 3. Price */}
                  <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{product.price} zł</td>

                  {/* 4. Rating */}
                  <td className="px-4 py-3 text-[#1C1C1C]">
                    <span className="text-amber-500">★</span>{" "}{product.rating} ({product.reviewCount})
                  </td>

                  {/* 5. Views */}
                  <td className="px-4 py-3 text-[#1C1C1C]">{views.toLocaleString()}</td>

                  {/* 6. Promote button */}
                  <td className="px-4 py-3">
                    <Link
                      href={`/seller/promote/${product.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C1C] text-white text-[11px] font-semibold tracking-wider uppercase rounded-lg hover:bg-[#333] transition-colors"
                    >
                      <Sparkles size={12} />
                      Promote
                    </Link>
                  </td>

                  {/* 7. Visibility */}
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-semibold tracking-wider text-[#1C1C1C] uppercase">Public</span>
                  </td>

                  {/* 8. Status */}
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider bg-green-50 text-green-700 border border-green-200 uppercase">
                      Active
                    </span>
                  </td>

                  {/* 9. View link — no header */}
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

      <p className="mt-4 text-[11px] text-[#6B6B6B] text-center">
        Showing existing catalog items. Editing coming soon.
      </p>
    </div>
  );
}
