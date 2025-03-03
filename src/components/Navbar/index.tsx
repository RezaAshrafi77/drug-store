"use client"

import Link from "next/link"
import { useCartStore } from "@/store/cartStore"
import { usePathname, useRouter } from "next/navigation"
import {
    ShoppingCartIcon,
    Bars3Icon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline"

export default function Navbar() {
    const { cart } = useCartStore()
    const cartCount = cart.length
    const pathname = usePathname()
    const router = useRouter()

    const isHome = pathname === "/"

    return (
        <nav className="bg-purple-100 p-4 shadow-md w-full sticky top-0">
            <div className="container mx-auto flex justify-between items-center">
                <button>
                    <Bars3Icon className="text-purple-900 h-6 w-6" />
                </button>
                {!isHome && (
                    <button
                        onClick={() => router.back()}
                        className="flex items-center"
                    >
                        <ArrowLeftIcon className="text-purple-900 h-6 w-6" />
                    </button>
                )}
                {isHome && (
                    <Link href="/cart" className="flex items-center relative">
                        <ShoppingCartIcon className="text-purple-900 h-6 w-6 mr-1" />
                        {cartCount > 0 && (
                            <span className="text-[8px] bg-purple-900 absolute top-0 right-0 w-3 h-3 rounded-full flex justify-center items-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                )}
            </div>
        </nav>
    )
}
