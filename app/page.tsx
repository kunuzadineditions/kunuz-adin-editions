import Hero from "@/components/sections/Hero";
import FeaturedBooks from "@/components/sections/FeaturedBooks";
import CoeurVivant from "@/components/sections/CoeurVivant";
import Manifeste from "@/components/sections/Manifeste";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedBooks />
      <CoeurVivant />
      <Manifeste />
      <Newsletter />
    </>
  );
}
