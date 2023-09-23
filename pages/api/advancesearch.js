import prisma from "@/lib/prisma"

export default async function handler(req, res) {
    const body = req.body
    console.log(body)

    const {name, source, uniprot, from, to} = req.query
    // protein_name	protein_source	uniprot_id	mutation_protein temperature


    const whereOptions = {
        // protein_name: Name,
        ['protein_name']: {
            hasSome: [name]
        },
        protein_source: source,
        uniprot_id: uniprot,
        // mutation_protein: mutation,
        temperature: {
            gte: parseFloat(from),
            lte: parseFloat(to)
        }
    }

    const result = await prisma.project.findMany({
        where:whereOptions})


    /***
 where: {
    'column': 'value to search'
    'temp': {
        gte: from,
        lte: to,
    }
 }
 filters {
    "column_name": "text"
    "temp": {
        from: ""
        to: ""
    }
    

 }
 */



    // Perform DB Search Here
    //console.log(result)

    const fix_bigINT_data = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    const data = JSON.parse(fix_bigINT_data)
    console.log(data)

    res.status(200).json({data: data})
}