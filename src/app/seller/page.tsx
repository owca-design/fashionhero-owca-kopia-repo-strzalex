import Link from "next/link";
import { Package, ShoppingBag, BarChart2, RotateCcw } from "lucide-react";

const tiles = [
  { label: "Products", href: "/seller/products", icon: Package, count: "20+" },
  { label: "Orders", href: "/seller/orders", icon: ShoppingBag, count: "—" },
  { label: "Analytics", href: "/seller/analytics", icon: BarChart2, count: "—" },
  { label: "Returns", href: "/seller/returns", icon: RotateCcw, count: "—" },
];

export default function SellerDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <p className="text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase mb-1">
        Welcome back
      </p>
      <h1 className="text-4xl font-bold text-[#1C1C1C] tracking-tight mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiles.map(({ label, href, icon: Icon, count }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl border border-[#E0DAD0] p-6 flex flex-col gap-4 hover:border-[#1C1C1C] transition-colors group"
          >
            <Icon size={20} className="text-[#6B6B6B] group-hover:text-[#1C1C1C] transition-colors" />
            <div>
              <p className="text-2xl font-bold text-[#1C1C1C]">{count}</p>
              <p className="text-[11px] font-semibold tracking-widest text-[#6B6B6B] uppercase mt-0.5">
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
