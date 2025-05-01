"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { type CarouselApi } from "@/components/ui/carousel"
import { motion } from "framer-motion"

interface ProductImage {
  src: string
  alt: string
}

interface ProductFeature {
  title: string
  details: string[]
}

interface Product {
  title: string
  subtitle: string
  description: string
  features: ProductFeature[]
  specs: string[]
  price: string
  originalPrice?: string
  images: ProductImage[]
  isOnSale?: boolean
}

const products: Product[] = [
  {
    title: "TITANIUM Kasher Classic®",
    subtitle: "The Original Titanium Innovation",
    description: "The pinnacle of lighter tool engineering, crafted from pure aerospace-grade 2 titanium.",
    features: [
      {
        title: "Premium Construction",
        details: [
          "Aerospace Grade 2 Titanium",
          "Superior durability and longevity",
          "Precision sandblasted finish"
        ]
      },
      {
        title: "Professional Design",
        details: [
          "Ergonomic grip pattern",
          "Optimized weight distribution",
          "Seamless integration with lighters"
        ]
      }
    ],
    specs: [
      "Material: Grade 2 Titanium",
      "Finish: Sandblasted",
      "Warranty: Lifetime",
      "Patent: US 8,291,917"
    ],
    price: "$24.99",
    images: [
      { src: "/black-titanium/001-Titanium2_600x.webp", alt: "Titanium Kasher Classic front view" },
      { src: "/black-titanium/002-Titanium1_800x.webp", alt: "Titanium Kasher Classic side view" },
      { src: "/black-titanium/TitaniumFront_600x.webp", alt: "Titanium Kasher Classic detail" },
    ]
  },
  {
    title: "TITANIUM Kasher 360® Metallic",
    subtitle: "Revolutionary 360° Technology",
    description: "Experience our signature 360° design in a stunning metallic finish, combining innovative functionality with luxurious aesthetics.",
    features: [
      {
        title: "Advanced Features",
        details: [
          "360° Revolutionary mechanism",
          "Premium metallic finish",
          "Enhanced ergonomics"
        ]
      },
      {
        title: "Professional Grade",
        details: [
          "Superior heat resistance",
          "Precision-engineered joints",
          "Limited edition status"
        ]
      }
    ],
    specs: [
      "Material: Grade 2 Titanium",
      "Finish: Metallic",
      "Mechanism: 360° Rotation",
      "Edition: Limited Release"
    ],
    price: "$34.99",
    originalPrice: "$40",
    isOnSale: true,
    images: [
      { src: "/black-titanium/K-Ti_gld_800x.webp", alt: "Titanium Kasher 360 Metallic front" },
      { src: "/black-titanium/K-Ti_gld-L_600x.webp", alt: "Titanium Kasher 360 Metallic side" },
    ]
  },
  {
    title: "TITANIUM Kasher 360® NAAR",
    subtitle: "Professional Torch Edition",
    description: "The ultimate fusion of form and function, our NAAR Edition takes the revolutionary 360° design to new heights with specialized torch features.",
    features: [
      {
        title: "Torch Optimization",
        details: [
          "Specialized torch compatibility",
          "Enhanced heat management",
          "Professional-grade durability"
        ]
      },
      {
        title: "Premium Details",
        details: [
          "Special NAAR Edition finish",
          "Collector's status",
          "Advanced engineering"
        ]
      }
    ],
    specs: [
      "Material: Grade 2 Titanium",
      "Compatibility: Torch Lighters",
      "Edition: NAAR Special Release",
      "Finish: Signature Black"
    ],
    price: "$34.99",
    originalPrice: "$40",
    isOnSale: true,
    images: [
      { src: "/black-titanium/K-Ti_BLK_600x.webp", alt: "Titanium Kasher 360 NAAR front" },
      { src: "/black-titanium/K-Ti_BLK-L_600x.webp", alt: "Titanium Kasher 360 NAAR side" },
    ]
  }
]

const ProductShowcase = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap())
    })

    // Setup autoplay
    const autoplayInterval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 6000)

    return () => clearInterval(autoplayInterval)
  }, [api])

  return (
    <section className="w-full py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-3 font-['Built_Titling'] text-[#000005] dark:text-white tracking-tight">
            Premium Titanium Collection
          </h2>
          <p className="text-xl mb-4 text-[#000005]/60 dark:text-white/60 max-w-3xl mx-auto font-['Avenir_Next']">
            Discover our exclusive line of aerospace-grade titanium products
          </p>
          <p className="text-base text-[#000005]/80 dark:text-white/80 max-w-2xl mx-auto font-['Avenir_Next']">
            Where precision engineering meets unparalleled craftsmanship
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative rounded-xl overflow-hidden bg-black">
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 space-y-8"
          >
            <div>
              <h3 className="text-4xl font-bold mb-2 font-['Built_Titling'] text-[#000005] dark:text-white">
                {products[activeIndex].title}
              </h3>
              <p className="text-xl mb-4 font-['Built_Titling'] text-[#9aca3c]">
                {products[activeIndex].subtitle}
              </p>
              <p className="text-lg text-[#000005]/80 dark:text-white/80 font-['Avenir_Next'] leading-relaxed">
                {products[activeIndex].description}
              </p>
            </div>

            {products[activeIndex].features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <h4 className="text-lg font-bold font-['Built_Titling'] text-[#000005] dark:text-white">
                  {feature.title}
                </h4>
                <ul className="space-y-1">
                  {feature.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-[#9aca3c]">•</span>
                      <span className="font-['Avenir_Next'] text-[#000005]/80 dark:text-white/80">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <div className="space-y-2">
              <h4 className="text-lg font-bold font-['Built_Titling'] text-[#000005] dark:text-white">
                Specifications
              </h4>
              <ul className="grid grid-cols-2 gap-2">
                {products[activeIndex].specs.map((spec, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="font-['Avenir_Next'] text-sm text-[#000005]/70 dark:text-white/70"
                  >
                    {spec}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#9aca3c] font-['Built_Titling']">
                {products[activeIndex].price}
              </span>
              {products[activeIndex].isOnSale && products[activeIndex].originalPrice && (
                <span className="text-xl line-through text-slate-500 font-['Avenir_Next']">
                  {products[activeIndex].originalPrice}
                </span>
              )}
            </div>

            <Button className="w-full px-8 py-6 text-lg bg-[#9aca3c] hover:bg-[#8bbb36] text-white font-['Avenir_Next']">
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
