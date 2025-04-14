/* c8 ignore start */
import { Poppins } from "next/font/google"
import { BottomNav } from '@/components/BottomNav'
import "./globals.css"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-poppins',
})

export const metadata = {
  title: "Beer Store POC",
  description: "A proof of concept for a beer store application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.className} font-normal`} suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
