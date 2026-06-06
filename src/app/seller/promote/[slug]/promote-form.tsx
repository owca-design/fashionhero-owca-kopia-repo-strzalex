"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowLeft, Check, TrendingUp, Clock, Tag } from "lucide-react";
import type { Product } from "@/types";

export function PromoteForm({ product }: { product: Product }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const color = product.colors[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-10 py-12">
      <p className="text-[11px] uppercase tracking-[0.1em] text-[#6B6B6B]">
        <Link href="/seller/products" className="hover:text-[#1C1C1C] inline-flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Wróć do produktów
        </Link>
      </p>

      <div className="mt-8 grid md:grid-cols-[1fr_320px] gap-10 items-start">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#1C1C1C] text-white text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm">
            <Sparkles className="w-3 h-3" /> Wczesny dostęp
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] tracking-tight mt-4">
            Promuj swój produkt
          </h1>
          <p className="text-base text-[#3C3C3C] mt-4 leading-relaxed">
            Wkrótce uruchamiamy płatne promowanie produktów w wynikach wyszukiwania i na stronie głównej.
            Sprzedawcy z wczesnego dostępu otrzymają <strong>30% zniżki</strong> na pierwszą kampanię
            oraz priorytetowe wsparcie przy konfiguracji.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { icon: Tag, label: "Cena od", value: "49 zł", sub: "za kampanię", c: "#6B6B6B" },
              { icon: Clock, label: "Czas trwania", value: "7 dni", sub: "domyślnie", c: "#6B6B6B" },
              { icon: TrendingUp, label: "Szac. wzrost", value: "3×", sub: "więcej wyświetleń", c: "#1E7C3A" },
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
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#1E7C3A]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1C1C1C]">Jesteś na liście</h2>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    Wyślemy wiadomość na <strong className="text-[#1C1C1C]">{email}</strong> gdy
                    promowanie produktu „{product.name}" będzie dostępne.
                  </p>
                  <Link href="/seller/products" className="inline-block mt-4 text-[11px] tracking-[0.1em] font-semibold uppercase text-[#1C1C1C] underline">
                    Wróć do produktów
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-[#1C1C1C]">Dołącz do wczesnego dostępu</h2>
                <p className="text-sm text-[#6B6B6B] mt-1">
                  Zostaw email — odezwiemy się gdy uruchomimy promowanie dla Twojego konta.
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
                    Zapisz mnie
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <aside className="bg-white rounded-sm border border-black/5 p-5">
          <div className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B] font-semibold">Popularny w tej kategorii</div>
          <div className="mt-3 aspect-square rounded-sm overflow-hidden bg-[#EEE9E3]">
            <Image src={color.image} alt={product.name} width={320} height={320} className="w-full h-full object-cover" />
          </div>
          <div className="mt-4">
            <div className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#1C1C1C]">{product.name}</div>
            <div className="text-[11px] text-[#6B6B6B] mt-0.5">{color.name}</div>
            <div className="text-sm font-semibold text-[#1C1C1C] mt-2">{product.price} zł</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
