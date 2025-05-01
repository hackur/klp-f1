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

interface Product {
  title: string
  description: string
  features: string[]
  price: string
  originalPrice?: string
  images: ProductImage[]
  isOnSale?: boolean
}

const products: Product[] = [
  {
    title: "TITANIUM Kasher Classic®",
    description: "The pinnacle of lighter tool engineering, crafted from pure aerospace-grade 2 titanium. Experience unmatched durability with our sandblasted finish that provides superior grip and resistance to wear.",
    features: [
      "Aerospace Grade 2 Titanium Construction",
      "Precision Sandblasted Finish",
      "Premium Durability",
      "Elegant Design",
      "Lifetime Warranty"
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
    description: "Elevate your experience with our signature 360° design, now in a stunning metallic finish. This premium edition combines innovative functionality with luxurious aesthetics.",
    features: [
      "360° Revolutionary Design",
      "Premium Metallic Finish",
      "Enhanced Ergonomics",
      "Superior Heat Resistance",
      "Exclusive Limited Edition"
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
    description: "The ultimate fusion of form and function, our NAAR Edition takes the revolutionary 360° design to new heights with specialized features for torch lighters.",
    features: [
      "Torch-Optimized Design",
      "Special NAAR Edition Finish",
      "Enhanced Heat Management",
      "Precision Engineering",
      "Collector's Item Status"
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
        <h2 className="text-5xl font-bold text-center mb-4 font-['Built_Titling'] text-[#000005] dark:text-white tracking-tight">
          Premium Titanium Collection
        </h2>
        <p className="text-center mb-16 text-xl text-[#000005]/80 dark:text-white/80 max-w-3xl mx-auto font-['Avenir_Next']">
          Discover our exclusive line of aerospace-grade titanium products, where precision engineering meets unparalleled craftsmanship.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
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
            className="p-8"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-3 font-['Built_Titling'] text-[#000005] dark:text-white">
                  {products[activeIndex].title}
                </h3>
                <p className="text-lg text-[#000005]/80 dark:text-white/80 font-['Avenir_Next']">
                  {products[activeIndex].description}
                </p>
              </div>

              <div className="space-y-2">
                {products[activeIndex].features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[#9aca3c]">•</span>
                    <span className="font-['Avenir_Next'] text-[#000005]/80 dark:text-white/80">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-8">
                <span className="text-2xl font-bold text-[#9aca3c]">
                  {products[activeIndex].price}
                </span>
                {products[activeIndex].isOnSale && products[activeIndex].originalPrice && (
                  <span className="text-lg line-through text-slate-500">
                    {products[activeIndex].originalPrice}
                  </span>
                )}
              </div>

              <Button className="px-8 py-6 text-lg bg-[#9aca3c] hover:bg-[#8bbb36] text-white font-['Avenir_Next']">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
