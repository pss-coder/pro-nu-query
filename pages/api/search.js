import { PrismaClient } from "@prisma/client"

const query = {}
query.where = {}

function protein_info_filter(protein_name, protein_source, uniprot_id, from, to) {
    // check 
    
    if (protein_name) {
        query.where = {
            'protein_name': {
                hasSome: [protein_name]
            },
        }
        
    }
    if (uniprot_id) {
        query.where.uniprot_id = uniprot_id
    }
    if (protein_source) {
        query.where.protein_source = protein_source
    }
    if (from != '' && to != '') {
        query.where.temperature = {
            gte: parseFloat(from),
            lte: parseFloat(to)
        }
    }
}

// display rows after search
export default async function handler(req, res) {
    const prisma = new PrismaClient()

    // For View All
    if(req.query.all && req.query.page) { //for view all
        var result = await prisma.project.findMany({take: 10,skip: 10*req.query.page})
        const fix_bigINT_data = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        const data = JSON.parse(fix_bigINT_data)
        res.status(200).json({data: data})
        return
    }

    if(req.query.issimple == 'true') {
        // For Simple Search
    const {column, value, page} = req.query
    if(!column || !value || !page) {
        return res.status(400).json({ error: { message:  'No result found' } })
    }
    var result = null
    if(column == 'protein_name') {
        result = await prisma.project.findMany({
            where: {
                'protein_name': {
                    hasSome: [value]
                }
            },
            take: 10,
            skip: 10*page
          })
    } else {
        result = await prisma.project.findMany({
            where: {
                [column]: {
                    equals: value
                }
            },
            take: 10,
            skip: 10*page
          })
    }
    
    const fix_bigINT_data = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    const data = JSON.parse(fix_bigINT_data)
    if(data.length > 0 ) {
        return res.status(200).json({data: data})
    } else {
        return res.status(400).json({ error: { message:  'No result found' } })
    }
}

    // For Advance Search
    // retrieve data from query?
    const {name, source, uniprot, from, to, page} = req.query
    console.log(req.query)
    // protein_name	protein_source	uniprot_id	mutation_protein temperature


     // Protein Information: protein_name protein_source length mutation_protein		uniprot_id	
    
    // Nucleic Acid: nucleic_acid_name	type_nuc

    // Experimenetal Condition: pH	temperature method

    //Thermodynamic Parameters: dG_wild(kcal/mol) ddG	

    // References: year	authors	journal
    

    protein_info_filter(name,source,uniprot,from,to)
    // TODO: add the other filters
    
    query.take = 10
    query.skip = 10*page
    var result = await prisma.project.findMany(query)

    const fix_bigINT_data = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    const data = JSON.parse(fix_bigINT_data)
    console.log(data)

    res.status(200).json({data: data})



    
}