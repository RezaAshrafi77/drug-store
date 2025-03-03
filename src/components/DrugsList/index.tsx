"use client"
import Link from "next/link"
import DrugItem from "@/components/DrugItem"
import Pagination from "@/components/Pagination"
import { Drug, useCartStore } from "@/store/cartStore"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

interface DrugsListProps {
    totalDrugs: Drug[]
}

export default function DrugsList({ totalDrugs }: DrugsListProps) {
    const { cart, total } = useCartStore()
    const ITEMS_PER_PAGE = 10
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const [drugs, setDrugs] = useState<Drug[]>([])

    useEffect(() => {
        const offset = (page - 1) * ITEMS_PER_PAGE
        setDrugs(totalDrugs.slice(offset, offset + ITEMS_PER_PAGE))
    }, [page, totalDrugs])

    const totalPages = useMemo(
        () => Math.ceil(totalDrugs.length / ITEMS_PER_PAGE),
        [totalDrugs]
    )

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-scroll py-2">
                {drugs.map((drug: Drug) => (
                    <DrugItem
                        key={drug.id}
                        drug={drug}
                        quantity={
                            cart.find((item) => item.drug.id === drug.id)
                                ?.quantity || 0
                        }
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination totalPages={totalPages} currentPage={page} />
            )}
            {total > 0 && (
                <Link
                    href="/cart"
                    className="block my-4 bg-purple-900 w-full text-center rounded-md text-white py-2"
                >
                    {"تکمیل خرید"}
                </Link>
            )}
        </div>
    )
}
