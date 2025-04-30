import { getLandingContent } from "@/lib/i18n";

import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ProblemHookSection } from "@/components/layout/sections/problem-hook";
import { WhatIsItSection } from "@/components/layout/sections/what-is-it";
import { HowItWorksSection } from "@/components/layout/sections/how-it-works";
import { BenefitsSection } from "@/components/layout/sections/benefits";
import { WhoIsItForSection } from "@/components/layout/sections/who-is-it-for";
import { SalesPsychologySection } from "@/components/layout/sections/sales-psychology";
import { FAQSection } from "@/components/layout/sections/faq";
import { FundingSection } from "@/components/layout/sections/funding";
import { FinalCTASection } from "@/components/layout/sections/final-cta";

export const metadata = {
  metadataBase: new URL("https://mykasher.com"),
  ...getLandingContent().meta,
};

export default function Home() {
  const content = getLandingContent();

  return (
    <>
      <HeroSection
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        description={content.hero.description}
      />

      <ProblemHookSection content={content.hero.description} />

      <WhatIsItSection
        title={content.whatIsIt.title}
        description={content.whatIsIt.description}
        qrDestinations={content.whatIsIt.qrDestinations}
        modelsIntro={content.whatIsIt.modelsIntro}
        models={content.whatIsIt.models}
        modelsOutro={content.whatIsIt.modelsOutro}
      />

      <HowItWorksSection
        title={content.howItWorks.title}
        subtitle={content.howItWorks.subtitle}
        description={content.howItWorks.description}
        steps={content.howItWorks.steps}
      />

      <BenefitsSection
        title={content.benefits.title}
        items={content.benefits.items}
      />

      <WhoIsItForSection
        title={content.whoIsItFor.title}
        description={content.whoIsItFor.description}
        types={content.whoIsItFor.types}
      />

      <SalesPsychologySection
        title={content.salesPsychology.title}
        points={content.salesPsychology.points}
      />

      <FAQSection title={content.faq.title} items={content.faq.items} />

      <FundingSection
        title={content.funding.title}
        poweredBy={content.funding.poweredBy}
        tagline={content.funding.tagline}
        description={content.funding.description}
        features={content.funding.features}
        outro={content.funding.outro}
        ctaPrequalify={content.funding.ctaPrequalify}
        ctaTalk={content.funding.ctaTalk}
        logoUrl={content.funding.logoUrl}
      />

      <FinalCTASection
        title={content.finalCta.title}
        description={content.finalCta.description}
        subtitle={content.finalCta.subtitle}
        buttonConsultation={content.finalCta.buttonConsultation}
        consultationSubtitle={content.finalCta.consultationSubtitle}
        buttonMockup={content.finalCta.buttonMockup}
        mockupSubtitle={content.finalCta.mockupSubtitle}
        buttonClaimSpot={content.finalCta.buttonClaimSpot}
        claimSpotSubtitle={content.finalCta.claimSpotSubtitle}
        outro={content.finalCta.outro}
      />

      <FooterSection />
    </>
  );
}
