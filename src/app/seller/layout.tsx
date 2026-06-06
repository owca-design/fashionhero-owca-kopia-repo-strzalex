import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, BarChart2, RotateCcw, Bell, User } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/seller", icon: LayoutDashboard },
  { label: "Products", href: "/seller/products", icon: Package },
  { label: "Orders", href: "/seller/orders", icon: ShoppingBag },
  { label: "Analytics", href: "/seller/analytics", icon: BarChart2 },
  { label: "Returns", href: "/seller/returns", icon: RotateCcw },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#EEE9E3] flex flex-col">
      <header className="bg-white border-b border-[#E0DAD0]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-bold tracking-tight text-[#1C1C1C]">FashionHero</span>
            <span className="text-[10px] font-semibold tracking-widest text-[#6B6B6B] border border-[#E0DAD0] rounded px-1.5 py-0.5">
              SELLER
            </span>
          </Link>

          <nav className="flex items-center gap-1 flex-1">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 text-xs font-semibold tracking-widest text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors uppercase"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-[#1C1C1C]">UrbanEdge</span>
              <span className="text-[10px] font-bold tracking-wider text-white bg-[#1C1C1C] rounded px-1.5 py-0.5">
                PRO
              </span>
            </div>
            <button className="text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors">
              <Bell size={18} />
            </button>
            <button className="text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors">
              <User size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
