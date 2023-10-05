import { Container } from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import SearchField from "@/components/SearchField";
import Table from "@/components/Table";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router"
import { useState } from "react";
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

/* function to save JSON to file from browser
    * adapted from http://bgrins.github.io/devtools-snippets/#console-save
    * @param {Object} data -- json object to save
    * @param {String} file -- file name to save to 
    */
function saveJSON(data, filename){

    if(!data) {
        console.error('No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
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
    if(data.data.length == 0) { return (
        <>
        No Results Found
        <Link href={'/'}>Go Back Home</Link></>
    )
}
    if (data.data.length > 0) { 
        console.log("has lenght")
        // # of items from data
        return (
        <>
            <Head>
                <title>Results: {data.total_count}</title>
            </Head>

            <div className="flex flex-col min-h-screen min-w-full"> {/* Use a div wrapper with flex and flex-col */}
            <Header />
            <main className='flex-grow'>
                <Container className="pt-4 pb-16 text-center lg:pt-5">
                    {isSimpleSearch && <SearchField columnIndex={colindex} value={value} /> }

                    <button onClick={() => saveJSON(data.total, "results.json")}
                    type="button"
        className="rounded-md bg-indigo-50 m-5 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    > Download Table json format</button>
                    <Table results={data.data} />

                    <Pagination page={page} setPage={setPage} length={data.data.length} total={data.total_count} />
                </Container>
            </main>

            {/* <Footer /> */}
            </div>

        </>
    )
    }
}