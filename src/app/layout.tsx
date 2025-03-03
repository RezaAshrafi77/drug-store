import Navbar from "@/components/Navbar"
import "./globals.css"
import CartInitializer from "@/components/CartInitializer"
import { Suspense } from "react"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fa">
            <body className="" dir="rtl">
                <CartInitializer />
                <Navbar />
                <main className="mx-auto p-4">
                    <Suspense
                        fallback={
                            <p className="text-center w-full">
                                {"صبر کنید ..."}
                            </p>
                        }
                    >
                        {children}
                    </Suspense>
                </main>
            </body>
        </html>
    )
}
