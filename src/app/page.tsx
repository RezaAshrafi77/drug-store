import DrugsList from "@/components/DrugsList"
import { Drug } from "@/store/cartStore"

export default async function HomePage() {
    const res = await fetch("http://localhost:4000/drugs", {
        next: { revalidate: 10 },
    })
    const totalDrugs: Drug[] = await res.json()

    return <DrugsList totalDrugs={totalDrugs} />
}
