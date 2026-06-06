import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function SellerOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <p className="text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase mb-1">
        Seller Panel
      </p>
      <h1 className="text-4xl font-bold text-[#1C1C1C] tracking-tight mb-10">Orders</h1>
      <div className="bg-white rounded-xl border border-[#E0DAD0] p-12 flex flex-col items-center text-center gap-6 max-w-md mx-auto">
        <div className="w-14 h-14 rounded-full bg-[#EEE9E3] flex items-center justify-center">
          <ShoppingBag size={24} className="text-[#6B6B6B]" />
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase mb-2">Coming soon</p>
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-2">Orders is under construction</h2>
          <p className="text-sm text-[#6B6B6B]">In the meantime, manage your products from the catalog.</p>
        </div>
        <Link
          href="/seller/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1C1C1C] text-white text-[11px] font-semibold tracking-widest uppercase rounded-lg hover:bg-[#333] transition-colors"
        >
          Go to Products
        </Link>
      </div>
    </div>
  );
}
