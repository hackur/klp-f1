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
import { FadeIn } from "@/components/ui/fade-in";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import ProductShowcase from "@/components/ui/product-showcase";

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

      <SponsorsSection />

      <FadeIn>
        <ProductShowcase />
      </FadeIn>

      <FadeIn delay={300}>
        <ProblemHookSection content={content.hero.description} />
      </FadeIn>

      <FadeIn delay={600}>
        <WhatIsItSection
          title={content.whatIsIt.title}
          description={content.whatIsIt.description}
          qrDestinations={content.whatIsIt.qrDestinations}
          modelsIntro={content.whatIsIt.modelsIntro}
          models={content.whatIsIt.models}
          modelsOutro={content.whatIsIt.modelsOutro}
        />
      </FadeIn>

      <FadeIn delay={900}>
        <HowItWorksSection
          title={content.howItWorks.title}
          subtitle={content.howItWorks.subtitle}
          description={content.howItWorks.description}
          steps={content.howItWorks.steps}
        />
      </FadeIn>

      <FadeIn delay={1200}>
        <BenefitsSection
          title={content.benefits.title}
          items={content.benefits.items}
        />
      </FadeIn>

      <FadeIn delay={1500}>
        <WhoIsItForSection
          title={content.whoIsItFor.title}
          description={content.whoIsItFor.description}
          types={content.whoIsItFor.types}
        />
      </FadeIn>

      <FadeIn delay={1800}>
        <SalesPsychologySection
          title={content.salesPsychology.title}
          points={content.salesPsychology.points}
        />
      </FadeIn>

      <FadeIn delay={2100}>
        <FAQSection title={content.faq.title} items={content.faq.items} />
      </FadeIn>

      <FadeIn delay={2400}>
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
      </FadeIn>

      <FadeIn delay={2700}>
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
      </FadeIn>

      <FadeIn delay={3000}>
        <FooterSection />
      </FadeIn>
    </>
  );
}
