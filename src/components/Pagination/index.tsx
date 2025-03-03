"use client"

import { usePathname, useRouter } from "next/navigation"

interface PaginationProps {
    totalPages: number
    currentPage: number
}

export default function Pagination({
    totalPages,
    currentPage,
}: PaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = new URLSearchParams()

    const goToPage = (page: number) => {
        searchParams.set("page", String(page))
        router.push(`${pathname}?${searchParams.toString()}`)
    }

    const createPagination = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            if (currentPage > 3) {
                pages.push("...")
            }

            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) {
                pages.push("...")
            }

            pages.push(totalPages)
        }

        return pages
    }

    return (
        <div className="flex items-center justify-center space-x-2 mt-6">
            {currentPage > 1 && (
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    className="px-3 py-1"
                >
                    {"<"}
                </button>
            )}

            {createPagination().map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 rounded-md ${
                            currentPage === page
                                ? "text-blue-600 border border-blue-600"
                                : "hover:bg-gray-200"
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="px-3 py-1">
                        {page}
                    </span>
                )
            )}

            {currentPage < totalPages && (
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    className="px-3 py-1"
                >
                    {">"}
                </button>
            )}
        </div>
    )
}
