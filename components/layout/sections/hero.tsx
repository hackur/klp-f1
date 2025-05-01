import Image from "next/image"
import { MultiStepForm } from "@/components/ui/multi-step-form"

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
}

export function HeroSection({ title, subtitle, description }: HeroProps) {
  const formattedDescription = description?.split("\n").map((line, i) => (
    <p key={i} className="mt-2">
      {line}
    </p>
  ))

  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9aca3c] to-[#699029] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-8 pt-20 pb-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-[#000005] dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-xl sm:text-2xl text-[#000005]/80 dark:text-white/80 font-sans">
              {subtitle}
            </h2>
          )}
          {formattedDescription && (
            <div className="text-base sm:text-lg text-[#000005]/60 dark:text-white/60 font-sans">
              {formattedDescription}
            </div>
          )}
        </div>
        
        <div className="flex-1 w-full">
          <MultiStepForm />
        </div>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9aca3c] to-[#699029] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  )
}
