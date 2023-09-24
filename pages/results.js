import { Container } from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import SearchField from "@/components/SearchField";
import Table from "@/components/Table";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

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

function handleQuery(query) {
    // check if it is simple search or advance
    const isSimple = query.issimple == 'true'
}

/***
 data.count <- tells us how many rows there are
 data.count / 10 <- how many pages we need
 page 1,2,3...,8,9,10
    page 2,3,4...8,9
  */ 

export default function Results() {
    const [page,setPage] = useState(0)

    // Handle Simple Query
    const router = useRouter()
    const {colindex,column, value, issimple} = router.query
    const isSimpleSearch = router.query.issimple == 'true' ? true : false
    
    // const {name, source, uniprot, from, to} = router.query
    // console.log(router.query)
    
    const isAdvancedSearch = !isSimpleSearch
    var qury = router.query
    qury.page = page

    
    

    const { data, error, isLoading } = useSWR( 
        isSimpleSearch ? '/api/search?'+new URLSearchParams({issimple,column, value,page}).toString() : 
        isAdvancedSearch ? '/api/search?'+ new URLSearchParams(qury) : null, 
        fetcher)
    
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    // return <div>hello {data.data[0].id}!</div>
    if (data) { 
        // # of items from data
        
        return (
        <>
            {/* <ul>
                {data.data.map((row) => {
                    return (
                        <div key={row.id}>
                        <Link href={'/acids/'+row.id}>{row.id} {row.protein_name} {row.protein_source} {row.length} {row.dG_wild_kcal_mol_} {row.nucleic_acid_name}</Link>
                        </div>
                    )})}
                    <br />
            </ul> */}
            <Head>
                <title>ProNuQuery</title>
            </Head>

            <div className="flex flex-col min-h-screen"> {/* Use a div wrapper with flex and flex-col */}
            <main className='flex-grow'>
                <Header />
            
                <Container>
                    {isSimpleSearch && <SearchField columnIndex={colindex} value={value} /> }
                    <Table results={data.data} />
                    <Pagination page={page} setPage={setPage} length={data.data.length} />
                </Container>
            </main>

            <Footer />
            </div>


            
        </>
    )
    }

    return (
        <>
        <Header />
            <Container>
            <Table results={dummyData} />
            {/* <Pagination /> */}
            </Container>
            
        </>

    )
}