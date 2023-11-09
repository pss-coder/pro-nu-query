import useSWR from "swr";
import prisma from "./prisma";


//TODO: store local references of IDs
// store references to columns here
export function getColumns() {
    const columns = [
        { id: 3, name: 'nucleic_acid_name', display:'Nucleic Acid Name' },
        { id: 4, name: 'type_nuc', display: 'Nucleic Acid Type'  },
        { id: 7, name: 'mutation_protein', display:'Mutation' },
        { id: 1, name: 'protein_name', display:'Protein Name' },
        { id: 2, name: 'protein_source', display:'Protein Source' },
        { id: 5, name: 'method', display:'Method' },
        { id: 6, name: 'journal', display:'Journal' },
    ]
    return columns;
}

export async function getColData(column_name) {
    // call api 
    // const fetcher = (url) => fetch(url).then((res) => res.json());
    // const { data, error, isLoading } = useSWR('/api/column?name='+column_name, fetcher)
    //TODO: consider moving api to dbManager instead? 
    // return data
    return fetch(`/api/column?name=${column_name}`)
}

export async function getPaginatedData(column, value, skip) {
    // skip 10
    // page: 1 -> display 10 results; id 1 - 10
    // page: 2 -? display next 10; id 11 - 20
    // page: 3 -> dispaly next 10.....

    var result = null
    if(column == 'protein_name') {
        result = await prisma.project.findMany({
            where: {
                [column]: {
                    hasSome: [value]
                }
            },
            take: 10,
            skip: 10*skip
          })
    } else {
        result = await prisma.project.findMany({
            where: {
                [column]: {
                    equals: value
                }
            },
            take: 10,
            skip: 10*skip
          })
    }

    const fix_bigINT_data = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    const data = JSON.parse(fix_bigINT_data)

    return data;
}


// for [id].js 

export async function getAllAcidIds() {

    const data = await prisma.project.findMany({
        select: {
            id: true
        }
    })

    // each element must have params
    return data.map((id) => {
        return {
            params: {
              id: Number(id.id).toString()
            },
          };
    });
}

export async function getAcidData(id) {
    const data = await prisma.project.findUnique({
        where: {
            id : id
        }, 
    })

    //fix bigint issue
    const dt = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v)

    return {
        dt
    }
}

export async function getSequence(uniprot_id) {
    return fetch(`/api/uniprot?uniprotid=${uniprot_id}`)
}

// export async function getAdvancedSearch(filters) {
//     // display options -> select
//     // if no value from column input -> exclude in where
// /***
//  where: {
//     'column': 'value to search'
//     'temp': {
//         gte: from,
//         lte: to,
//     }
//  }
//  filters {
//     "column_name": "text"
//     "temp": {
//         from: ""
//         to: ""
//     }
    

//  }
//  */
// }

