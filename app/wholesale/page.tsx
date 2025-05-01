import { HeroSection } from "@/components/layout/sections/hero"

export const metadata = {
  title: "Wholesale Inquiry | Kasher",
  description: "Submit your wholesale inquiry for Kasher products",
}

export default function WholesalePage() {
  return (
    <main>
      <HeroSection
        title="Kasher Wholesale Program"
        subtitle="Join our network of distributors and retailers"
        description="Get started with wholesale pricing and opportunities. Fill out our secure wholesale inquiry form to begin the partnership process with Kasher."
      />
    </main>
  )
}
