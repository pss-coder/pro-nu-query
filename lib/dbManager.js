import useSWR from "swr";
import prisma from "./prisma";


//TODO: store local references of IDs
// store references to columns here
export function getColumns() {
    const columns = [
        { id: 1, name: 'protein_name' },
        { id: 2, name: 'protein_source' },
        { id: 3, name: 'nucleic_acid_name' },
        { id: 4, name: 'type_nuc' },
        { id: 5, name: 'method' },
        { id: 6, name: 'journal' },
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
    const data = await prisma.project.findMany({
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

