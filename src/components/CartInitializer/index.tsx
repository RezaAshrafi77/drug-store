"use client"

import { useEffect } from "react"
import { useCartStore } from "@/store/cartStore"

export default function CartInitializer() {
    const loadCartFromStorage = useCartStore(
        (state) => state.loadCartFromStorage
    )

    useEffect(() => {
        loadCartFromStorage()
    }, [])

    return null
}
