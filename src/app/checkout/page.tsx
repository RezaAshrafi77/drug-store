"use client"
import CheckoutItem from "@/components/CheckoutItem"
import { useCartStore } from "@/store/cartStore"
import { formatPrice } from "@/utils/helpers"

export default function CheckoutPage() {
    const { cart, total } = useCartStore()

    return (
        <div className="flex flex-col gap-4 h-[84vh]">
            <h1 className="text-lg font-demi-bold">{"تکمیل خرید"}</h1>
            <ul className="flex flex-col gap-4 divide-y divide-gray-400">
                {cart.map((item) => (
                    <CheckoutItem item={item} key={item.drug.id} />
                ))}
            </ul>
            <span className="border-t border-t-gray-400 pt-4">
                {"مجموع:" + " " + formatPrice(total)}
            </span>
        </div>
    )
}
