import { Container } from "@/components/Container";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Head from "next/head";
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
            <Head>
                <title>View All</title>
            </Head>
                <Header />
                
                <Container>
                <button onClick={() => saveJSON(data.total, "results.json")}
                    type="button"
        className="rounded-md bg-indigo-50 m-5 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    > Download Table json format</button>
                <Table results={data.data} />
                <Pagination page={page} setPage={setPage} length={data.data.length} total={data.total_count} />
                </Container>
            </>
        )
    }

    
}