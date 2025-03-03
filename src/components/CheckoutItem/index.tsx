"use client"

import Image from "next/image"
import { CartItem as CartItemType } from "@/store/cartStore"
import { Default_Drug_Image } from "@/constants/images"
import { formatPrice } from "@/utils/helpers"
import { useMemo } from "react"

interface CheckoutItemProps {
    item: CartItemType
}

export default function CheckoutItem({ item }: CheckoutItemProps) {
    const totalPrice = useMemo(
        () => formatPrice(item.drug.price * item.quantity),
        [item]
    )

    const price = useMemo(() => formatPrice(item.drug.price), [item])
    return (
        <div className="p-4 flex justify-between gap-4 items-center w-full">
            <div className="flex flex-col items-start gap-2 h-full">
                <strong className="text-sm font-demi-bold">
                    {item.drug.name}
                </strong>
                <span className="text-xs">
                    {price} × {item.quantity}
                </span>
                <span className="text-sm font-demi-bold mt-auto">
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
            </div>
        </div>
    )
}
