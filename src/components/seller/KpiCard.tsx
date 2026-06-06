import type { ReactNode } from "react";

export function KpiCard({
  label,
  value,
  badge,
  footer,
  footerTone = "muted",
}: {
  label: string;
  value?: string;
  badge?: ReactNode;
  footer: string;
  footerTone?: "muted" | "success" | "danger";
}) {
  const toneClass =
    footerTone === "success"
      ? "text-[#2D7A3A]"
      : footerTone === "danger"
        ? "text-[#CC1818]"
        : "text-[#6B6B6B]";

  return (
    <div className="bg-white border border-[#E0DDD8] rounded-sm p-7 flex flex-col gap-3">
      {value ? (
        <div className="text-5xl font-bold text-[#1C1C1C] tracking-tight">{value}</div>
      ) : (
        <div>{badge}</div>
      )}
      <div className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#6B6B6B]">
        {label}
      </div>
      <div className={`text-xs ${toneClass}`}>{footer}</div>
    </div>
  );
}
