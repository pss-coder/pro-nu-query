import prisma from "@/lib/prisma"

export default async function handler(req, res) {
    const body = req.body
    console.log(body)
    const {Name, Source, UniProt, Mutation, from, to} = req.body
    // protein_name	protein_source	uniprot_id	mutation_protein temperature

    const whereOptions = {
        // protein_name: Name,
        [protein_name]: {
            hasSome: [Name]
        },
        protein_source: Source,
        uniprot_id: UniProt,
        mutation_protein: Mutation,
        temperature: {
            gte: from,
            lte: to
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


    res.status(200).json({data: result})
}