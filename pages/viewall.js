import { Container } from "@/components/Container";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { useState } from "react";
import useSWR from "swr";

const dummyData = [ {
    id: '97',
    protein_name: [ 'POU domain', 'class 2', 'transcription factor 1' ],
    protein_source: 'Homo sapiens (Human)',
    length: '743',
    uniprot_id: 'P14859',
    mutation_protein: [ 'wild' ],
    nucleic_acid_name: 'ds DNA',
    type_nuc: 'DNA',
    pH: 7.5,
    temperature: 273,
    method: 'Gel shift',
    dG_wild_kcal_mol_: -11.18,
    ddG: null,
    year: '1997',
    authors: [
      'van Leeuwen HC',
      'Strating MJ',
      'Rensen M',
      'de Laat W',
      'van der Vliet PC'
    ],
    journal: 'EMBO J',
    keywords: [
      'POU domain transcription factors',
      'DNA recognition',
      'DNase I footprinting'
    ]
  }
]

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ViewAll() {
    const [page,setPage] = useState(0)
    const all = true
    const { data, error, isLoading } = useSWR('/api/search?'+new URLSearchParams({all, page}), fetcher)


    // get all 
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if (data) {
        return (
            <>
                <Header />
                
                <Container>
                <Table results={data.data} />
                <Pagination page={page} setPage={setPage} length={data.data.length} />
                </Container>
            </>
        )
    }

    
}