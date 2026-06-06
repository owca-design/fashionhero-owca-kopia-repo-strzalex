export function TipCard({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div className="bg-white border border-[#E0DDD8] rounded-sm p-7 flex flex-col gap-4">
      <div className="text-3xl">{emoji}</div>
      <h3 className="text-[12px] uppercase tracking-[0.1em] font-semibold text-[#1C1C1C]">{title}</h3>
      <p className="text-sm text-[#6B6B6B] leading-relaxed flex-1">{text}</p>
      <button className="self-start text-[10px] tracking-[0.1em] font-semibold px-4 py-2 rounded-full border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition">
        LEARN MORE
      </button>
    </div>
  );
}
