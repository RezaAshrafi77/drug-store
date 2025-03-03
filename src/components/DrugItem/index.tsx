"use client"

import Image from "next/image"
import { Drug, useCartStore } from "@/store/cartStore"
import { useMemo } from "react"
import { formatPrice } from "@/utils/helpers"
import { Default_Drug_Image } from "@/constants/images"

interface DrugItemProps {
    drug: Drug
    quantity: number
}

export default function DrugItem({ drug, quantity }: DrugItemProps) {
    const addToCart = useCartStore((state) => state.addToCart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)

    const price = useMemo(() => formatPrice(drug.price), [drug])
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex gap-4 items-center text-center w-full">
            <Image
                src={drug.image || Default_Drug_Image}
                alt={drug.name}
                width={150}
                height={150}
                className="w-[25%] object-cover"
            />
            <div className="flex gap-4 flex-1 h-full">
                <div className="flex flex-col items-start flex-1 justify-end gap-6 pb-1 h-full pt-2">
                    <strong className="text-base font-semibold">
                        {drug.name}
                    </strong>
                    <span className="text-sm text-gray-500">{price}</span>
                </div>
                <div className="mt-auto">
                    {quantity ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => addToCart(drug)}
                                className=" text-purple-700-700 px-2 text-lg"
                            >
                                +
                            </button>
                            <span className="text-lg font-bold">
                                {quantity}
                            </span>
                            <button
                                onClick={() => removeFromCart(drug.id)}
                                className=" text-purple-700 px-2 text-lg"
                            >
                                -
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(drug)}
                            className=" text-purple-900 font-bold text-sm pb-1"
                        >
                            + افزودن
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
