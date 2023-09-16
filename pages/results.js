import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect } from "react";
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Results() {
    const router = useRouter()
    const {column, value} = router.query
    const isQueryPresent = column && value

    const { data, error, isLoading } = useSWR( 
        isQueryPresent ? '/api/search?'+new URLSearchParams({column, value}).toString() : null, 
        isQueryPresent ? fetcher : null)
    
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    // return <div>hello {data.data[0].id}!</div>
    if (data) { return (
        <>
            <ul>
                {data.data.map((row) => {
                    return (
                        <div key={row.id}>
                        <Link href={'/acids/'+row.id}>{row.id} {row.protein_name} {row.protein_source} {row.length} {row.dG_wild_kcal_mol_} {row.nucleic_acid_name}</Link>
                        </div>
                    )})}
                    <br />
            </ul>
        </>
    )
    }

    return (
        <>
            Nothing to display
            Link here for search or advanced search
        </>

    )
}