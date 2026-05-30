import Category from "@/components/home/Category";
import Hero from "@/components/home/Hero";
import LargePromoCard from "@/components/home/LargePromoCard";
import Personalized from "@/components/home/Personalized";
import PromoCard from "@/components/home/PromoCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full max-h-screen flex-col gap-4">
      <Hero />
      <Personalized />
      <Category />
      <PromoCard />
      <LargePromoCard />
    </main>
  );
}
