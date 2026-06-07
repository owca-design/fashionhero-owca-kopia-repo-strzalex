// Mock demand-signal data for the Demand Radar fake door (Products 2.0).
// Represents real buyer search queries in the seller's category over the last 7 days.
// "inCatalog: false" = a gap the seller is NOT covering = the hook.

export type DemandQuery = {
  query: string;
  searches: number; // unique buyer searches, last 7 days
  trend: number; // % week-over-week
  inCatalog: boolean; // does this seller have a matching product?
  estDemandPln: number; // estimated weekly demand value (PLN) the seller could capture
};

export const demandCategory = "Streetwear / Outerwear";
export const demandWindowLabel = "ostatnie 7 dni";

export const demandQueries: DemandQuery[] = [
  { query: "kurtka oversize beżowa", searches: 342, trend: 28, inCatalog: false, estDemandPln: 18400 },
  { query: "kurtka puffer krótka czarna", searches: 224, trend: 33, inCatalog: false, estDemandPln: 14100 },
  { query: "kamizelka puchowa krótka", searches: 198, trend: 41, inCatalog: false, estDemandPln: 9200 },
  { query: "bomber jacket oliwkowy", searches: 187, trend: 22, inCatalog: false, estDemandPln: 11600 },
  { query: "czapka beanie prążkowana", searches: 176, trend: 18, inCatalog: false, estDemandPln: 3100 },
  { query: "torba na ramię nylonowa", searches: 143, trend: 15, inCatalog: false, estDemandPln: 5400 },
  { query: "bluza z kapturem oversize szara", searches: 511, trend: 12, inCatalog: true, estDemandPln: 0 },
  { query: "cargo spodnie czarne", searches: 289, trend: 9, inCatalog: true, estDemandPln: 0 },
  { query: "spodnie dresowe szerokie", searches: 263, trend: 6, inCatalog: true, estDemandPln: 0 },
  { query: "longsleeve prążkowany", searches: 154, trend: -4, inCatalog: true, estDemandPln: 0 },
];

// Derived summary numbers for the KPI row.
export const demandSummary = {
  totalSearches: demandQueries.reduce((s, q) => s + q.searches, 0),
  gapCount: demandQueries.filter((q) => !q.inCatalog).length,
  lostDemandPln: demandQueries.reduce((s, q) => s + q.estDemandPln, 0),
};
