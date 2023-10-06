import Footer from "@/components/Footer"
import Header from "@/components/Header"
import SidebarComponent from "@/components/Sidebar"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const poppins = Poppins({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Online Health Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex h-screen`}>
        <SidebarComponent />
        <main className="flex flex-col justify-between w-full overflow-y-scroll bg-slate-50">
          <Header />
          <div className="flex-1 px-2 mb-2 overflow-y-scroll text-xl lg:p-6 content">
            {children}
          </div>
          <Footer />
          <Toaster />
        </main>
      </body>
    </html>
  )
}
