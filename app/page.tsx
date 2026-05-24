import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Mission } from "@/components/Mission";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { Donations } from "@/components/Donations";
import { FamilySupport } from "@/components/FamilySupport";
import { Transparency } from "@/components/Transparency";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Mission />
        <WhatWeBuild />
        <WhoWeHelp />
        <Donations />
        <FamilySupport />
        <Transparency />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
