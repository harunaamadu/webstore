import Bestsellers from "@/components/home/Bestsellers";
import Category from "@/components/home/Category";
import CollectionSpotlight from "@/components/home/CollectionSpotlight";
import Hero from "@/components/home/Hero";
import LargePromoCard from "@/components/home/LargePromoCard";
import Personalized from "@/components/home/Personalized";
import PromoCard from "@/components/home/PromoCard";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full max-h-screen flex-col gap-4">
      <Hero />
      <Personalized />
      <Category />
      <PromoCard />
      <LargePromoCard />
      <RecentlyViewed />
      <Bestsellers />
      <CollectionSpotlight />
    </main>
  );
}
