import Hero from "@/components/home/Hero";
import WhatWeOffer from "@/components/home/WhatWeOffer";
import PopularDestinations from "@/components/home/PopularDestinations";
import FerryOperators from "@/components/home/FerryOperators";
import Testimonials from "@/components/home/Testimonials";
import LatestArticles from "@/components/home/LatestArticles";
import CustomerSupport from "@/components/home/CustomerSupport";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeOffer />
      <PopularDestinations />
      <FerryOperators />
      <Testimonials />
      <LatestArticles />
      <CustomerSupport />
    </>
  );
}
