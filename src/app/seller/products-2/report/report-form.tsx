"use client";

import { useState } from "react";
import Link from "next/link";
import { Radar, ArrowLeft, Check, Search, TrendingUp, Lock } from "lucide-react";
import { demandCategory, demandSummary } from "@/data/demandRadar";
import { track } from "@/lib/track";

const fmt = (n: number) => n.toLocaleString("pl-PL");

type RetentionDriver = "commission" | "demand_knowledge";

export function ReportForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pollChoice, setPollChoice] = useState<RetentionDriver | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    track("seller_demand_radar_email", { source: "products-2", email });
    setSubmitted(true);
  };

  const choosePoll = (choice: RetentionDriver) => {
    track("seller_retention_driver_choice", { source: "products-2", choice });
    setPollChoice(choice);
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-10 py-12">
      <p className="text-[11px] uppercase tracking-[0.1em] text-[#6B6B6B]">
        <Link href="/seller/products-2" className="hover:text-[#1C1C1C] inline-flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Wróć do Products 2.0
        </Link>
      </p>

      <div className="mt-8 grid md:grid-cols-[1fr_320px] gap-10 items-start">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#1C1C1C] text-white text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm">
            <Radar className="w-3 h-3" /> Wczesny dostęp
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] tracking-tight mt-4">
            Pełny raport popytu
          </h1>
          <p className="text-base text-[#3C3C3C] mt-4 leading-relaxed">
            Wkrótce udostępniamy <strong>Demand Radar</strong> — pełną listę zapytań kupujących w Twojej kategorii,
            trendy 12-tygodniowe i szacowany popyt PLN dla każdej niszy, której nie masz w ofercie.
            To dane z 2,4 mln kupujących FashionHero — wiedza, której nie zdobędziesz nigdzie indziej.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { icon: Search, label: "Zapytań / tydz.", value: fmt(demandSummary.totalSearches), sub: "w Twojej kategorii", c: "#6B6B6B" },
              { icon: Lock, label: "Nisz bez oferty", value: String(demandSummary.gapCount), sub: "do odkrycia", c: "#A4421E" },
              { icon: TrendingUp, label: "Szac. popyt", value: `${fmt(demandSummary.lostDemandPln)} zł`, sub: "tygodniowo", c: "#1E7C3A" },
            ].map(({ icon: Icon, label, value, sub, c }) => (
              <div key={label} className="bg-white rounded-sm border border-black/5 p-4">
                <Icon className="w-4 h-4" style={{ color: c }} />
                <div className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B] mt-2 font-semibold">{label}</div>
                <div className="text-xl font-bold mt-1" style={{ color: c }}>{value}</div>
                <div className="text-[11px] text-[#6B6B6B]">{sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-sm border border-black/5 p-6">
            {submitted ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#1E7C3A]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#1C1C1C]">Jesteś na liście</h2>
                    <p className="text-sm text-[#6B6B6B] mt-1">
                      Wyślemy Twój pierwszy raport popytu na <strong className="text-[#1C1C1C]">{email}</strong>,
                      gdy tylko uruchomimy Demand Radar dla Twojego konta.
                    </p>
                  </div>
                </div>

                {/* Mikro-ankieta: informacja vs pieniadze (kill risk #2) */}
                <div className="mt-5 pt-5 border-t border-black/5">
                  {pollChoice ? (
                    <p className="text-[13px] text-[#1C1C1C] font-medium">
                      Dzięki! To nam pomaga zrozumieć, co naprawdę trzyma sprzedawców na FashionHero.
                    </p>
                  ) : (
                    <>
                      <p className="text-[13px] font-semibold text-[#1C1C1C]">
                        Szybkie pytanie: co bardziej by Cię zatrzymało na FashionHero?
                      </p>
                      <div className="mt-3 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => choosePoll("commission")}
                          className="flex-1 h-11 px-4 border border-black/15 rounded-sm text-[12px] font-semibold uppercase tracking-[0.06em] text-[#1C1C1C] hover:border-[#1C1C1C] transition-colors"
                        >
                          Niższa prowizja
                        </button>
                        <button
                          onClick={() => choosePoll("demand_knowledge")}
                          className="flex-1 h-11 px-4 border border-black/15 rounded-sm text-[12px] font-semibold uppercase tracking-[0.06em] text-[#1C1C1C] hover:border-[#1C1C1C] transition-colors"
                        >
                          Wiedza o popycie
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <Link href="/seller/products-2" className="inline-block mt-5 text-[11px] tracking-[0.1em] font-semibold uppercase text-[#1C1C1C] underline">
                  Wróć do Products 2.0
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-[#1C1C1C]">Dołącz do wczesnego dostępu</h2>
                <p className="text-sm text-[#6B6B6B] mt-1">
                  Zostaw email — wyślemy Ci pierwszy raport popytu, gdy Demand Radar ruszy.
                </p>
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ty@twojsklep.pl"
                    className="flex-1 h-11 px-4 bg-[#F5F2EE] border border-black/10 rounded-sm text-sm text-[#1C1C1C] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#1C1C1C]"
                  />
                  <button type="submit" className="h-11 px-6 bg-[#1C1C1C] text-white text-[11px] tracking-[0.1em] font-semibold uppercase rounded-sm hover:bg-black">
                    Wyślij mi raport
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <aside className="bg-white rounded-sm border border-black/5 p-5">
          <div className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B] font-semibold">Dlaczego to działa</div>
          <p className="text-[13px] text-[#3C3C3C] mt-3 leading-relaxed">
            Forte może dać 0% prowizji. Ale 0% z produktu, którego nikt nie szuka, to wciąż zero.
          </p>
          <p className="text-[13px] text-[#3C3C3C] mt-3 leading-relaxed">
            Demand Radar pokazuje Ci, <strong className="text-[#1C1C1C]">czego kupujący naprawdę chcą</strong> w kategorii {demandCategory} — żebyś sprzedawał to, co się sprzedaje.
          </p>
        </aside>
      </div>
    </div>
  );
}
