import Benefits from "@/components/Benefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import ParallaxSection from "@/components/ParallaxSection";
import ProblemSection from "@/components/ProblemSection";
import Trust from "@/components/Trust";

export default function Home() {
  return (
    <>
     <Hero />
     <ProblemSection />
     <FeaturedProducts />
      <Benefits />
      <ParallaxSection />
      <Trust />
    </>
  );
}