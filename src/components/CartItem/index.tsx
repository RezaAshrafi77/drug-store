"use client"

import Image from "next/image"
import { CartItem as CartItemType, useCartStore } from "@/store/cartStore"
import { Default_Drug_Image } from "@/constants/images"
import { formatPrice } from "@/utils/helpers"
import { useMemo } from "react"

interface CartItemProps {
    item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
    const addToCart = useCartStore((state) => state.addToCart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)

    const totalPrice = useMemo(
        () => formatPrice(item.drug.price * item.quantity),
        [item]
    )

    const price = useMemo(() => formatPrice(item.drug.price), [item])
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between gap-4 items-start w-full">
            <div className="flex flex-col items-start gap-2 h-full">
                <strong className="text-base font-demi-bold">
                    {item.drug.name}
                </strong>
                <span className="text-xs">
                    {price} × {item.quantity}
                </span>
                <span className="text-sm font-demi-bold text-green-600 mt-auto">
                    مجموع: {totalPrice}
                </span>
            </div>
            <div className="flex flex-col items-end gap-2">
                <Image
                    src={item.drug.image || Default_Drug_Image}
                    alt={item.drug.name}
                    width={50}
                    height={50}
                    className="object-cover"
                />
                <div className="flex gap-2 items-center justify-between rounded mt-2 w-[80px]">
                    <button
                        onClick={() => addToCart(item.drug)}
                        className="w-6 h-6 rounded text-xl font-demi-bold bg-gray-200"
                    >
                        +
                    </button>
                    <span className="text-lg font-bold">{item.quantity}</span>
                    <button
                        onClick={() => removeFromCart(item.drug.id)}
                        className="w-6 h-6 rounded text-xl font-demi-bold bg-gray-200"
                    >
                        -
                    </button>
                </div>
            </div>
        </div>
    )
}
