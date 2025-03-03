"use client"
import CartItem from "@/components/CartItem"
import { useCartStore } from "@/store/cartStore"
import Image from "next/image"
import Link from "next/link"
import { Empty_Cart_Background } from "@/constants/images"

export default function CartPage() {
    const cart = useCartStore((state) => state.cart)
    return (
        <div className="flex flex-col gap-4 h-[84vh]">
            <h1 className="text-lg font-bold">{"سبد خرید"}</h1>
            {cart.length === 0 ? (
                <div className="flex flex-col gap-6 my-auto items-center">
                    <Image
                        src={Empty_Cart_Background}
                        alt={"سبد خرید شما خالی است."}
                        width={200}
                        height={200}
                        className="object-cover mx-auto"
                    />
                    <p className="text-sm">{"سبد خرید شما خالی است."}</p>
                    <Link
                        href="/"
                        className="block mt-auto mx-auto text-center rounded-md bg-purple-900 text-white py-1 px-3"
                    >
                        {"مشاهده محصولات"}
                    </Link>
                </div>
            ) : (
                <ul className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <CartItem key={item.drug.id} item={item} />
                    ))}
                </ul>
            )}
            {cart.length > 0 && (
                <Link
                    href="/checkout"
                    className="block mt-auto bg-purple-900 w-full text-center rounded-md text-white py-2"
                >
                    {"ادامه خرید"}
                </Link>
            )}
        </div>
    )
}
