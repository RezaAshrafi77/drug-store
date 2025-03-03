import { create } from "zustand"

export interface Drug {
    id: number
    name: string
    price: number
    image: string
}

export interface CartItem {
    drug: Drug
    quantity: number
}

interface CartState {
    cart: CartItem[]
    total: number
    addToCart: (drug: Drug) => void
    removeFromCart: (id: number) => void
    loadCartFromStorage: () => void
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    total: 0,

    addToCart: (drug) =>
        set((state) => {
            const existingItem = state.cart.find(
                (item) => item.drug.id === drug.id
            )

            const updatedCart = existingItem
                ? state.cart.map((item) =>
                      item.drug.id === drug.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                  )
                : [...state.cart, { drug, quantity: 1 }]

            const newTotal = state.total + drug.price

            localStorage.setItem(
                "cart",
                JSON.stringify({ cart: updatedCart, total: newTotal })
            )

            return { cart: updatedCart, total: newTotal }
        }),

    removeFromCart: (id) =>
        set((state) => {
            const item = state.cart.find((item) => item.drug.id === id)
            if (!item) return state

            let updatedCart
            let newTotal = state.total

            if (item.quantity > 1) {
                updatedCart = state.cart.map((item) =>
                    item.drug.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                newTotal -= item.drug.price
            } else {
                updatedCart = state.cart.filter((item) => item.drug.id !== id)
                newTotal -= item.drug.price
            }

            localStorage.setItem(
                "cart",
                JSON.stringify({ cart: updatedCart, total: newTotal })
            )

            return { cart: updatedCart, total: newTotal }
        }),

    loadCartFromStorage: () => {
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("cart")
            if (storedData) {
                const parsed = JSON.parse(storedData)
                set({ cart: parsed.cart, total: parsed.total })
            }
        }
    },
}))
