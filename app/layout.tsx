import type { Metadata } from "next"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { Montserrat, Nunito_Sans, Lato, Figtree, Manrope, Roboto, Open_Sans, Noto_Sans, Sen } from 'next/font/google'
import "./globals.css"

const montserrat = Montserrat({ subsets: ['latin'] })
const nunitoSans = Nunito_Sans({ subsets: ['latin'] })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })
const figtree = Figtree({ subsets: ['latin'] })
const manrope = Manrope({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })
const openSans = Open_Sans({ subsets: ['latin'] })
const notoSans = Noto_Sans({ subsets: ['latin'] })
const sen = Sen({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Kasher Word-of-Mouth Marketing Program",
  description:
    "Amplify your brand with custom QR-coded Kashers and a proven word-of-mouth marketing program. Drive traffic, boost loyalty, and increase sales.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
