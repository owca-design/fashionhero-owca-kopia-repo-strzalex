import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { PromoteForm } from "./promote-form";

export default async function PromotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return <PromoteForm product={product} />;
}
