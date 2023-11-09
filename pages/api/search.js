import prisma from "@/lib/prisma"

const query = {}
query.where = {}

function protein_info_filter(protein_name, protein_source, uniprot_id, length_from, length_to) {
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
    if (length_from && length_to) {
        query.where.length = {
            gte: BigInt(length_from),
            lte: BigInt(length_to)
        }
    }
}

function nuc_acid_filter(nuc_acid, type) {
    if(nuc_acid) {

        query.where.nucleic_acid_name = nuc_acid
    }
    if(type) {
        query.where.type_nuc = type
    }
}

function experimental_condition_filter(method, temp_from, temp_to, ph_from, ph_to) {
    if (temp_from && temp_to) {
        query.where.temperature = {
            gte: parseInt(temp_from),
            lte: parseInt(temp_to)
        }
    }
    if (ph_from && ph_to) {
        query.where.pH = {
            gte: parseInt(ph_from),
            lte: parseInt(ph_to)
        }
    }

    if(method) {
        query.where.method = method
    }


}

function thermo_param_filter(dg_wild_from, dg_wild_to, ddg_from, ddg_to) {
    if (dg_wild_from || dg_wild_to) {
        query.where.dG_wild_kcal_mol_ = {
            gte: dg_wild_from ? parseInt(dg_wild_from) : 0,
            lte: dg_wild_to ? parseInt(dg_wild_to) : 0
        }
    }

    if (ddg_from && ddg_to) {
        query.where.ddG = {
            gte: Number(ddg_from),
            lte: Number(ddg_to)
        }
    }

}

// display rows after search
export default async function handler(req, res) {
    var count = 0; // for total count of results

    // For View All
    if(req.query.all && req.query.page) { //for view all
        var result = await prisma.project.findMany({take: 10,skip: 10*req.query.page})
        const fix_bigINT_data = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        const data = JSON.parse(fix_bigINT_data)

        var cr = await prisma.project.findMany()
        count = cr.length


        res.status(200).json({data: data, total_count: count, total:
            JSON.parse( JSON.stringify(cr, (_, v) => typeof v === 'bigint' ? v.toString() : v))})
        return
    }

    if(req.query.issimple == 'true') {
        // For Simple Search
    const {column, value, page} = req.query
    if(!column || !value || !page) {
        return res.status(400).json({ error: { message:  'No result found' } })
    }

    var result = null;
    

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

        var cr = await prisma.project.findMany({
            where: {
                'protein_name': {
                    hasSome: [value]
                }
            },
          })
        count = cr.length

    } else if (column == "mutation_protein") {
        result = await prisma.project.findMany({
            where: {
                'mutation_protein': {
                    hasSome: [value]
                }
            },
            take: 10,
            skip: 10*page
          })

        var cr = await prisma.project.findMany({
            where: {
                'mutation_protein': {
                    hasSome: [value]
                }
            },
          })
        count = cr.length
    }
    else {
        result = await prisma.project.findMany({
            where: {
                [column]: {
                    equals: value
                }
            },
            take: 10,
            skip: 10*page
          })

        var cr = await prisma.project.findMany({
            where: {
                [column]: {
                    equals: value
                }
            },
          })

        count = cr.length
    }


    
    const fix_bigINT_data = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    const data = JSON.parse(fix_bigINT_data)
    if(data.length > 0 ) {
        return res.status(200).json({data: data, total_count: count, total:
            JSON.parse( JSON.stringify(cr, (_, v) => typeof v === 'bigint' ? v.toString() : v))})
    } else {
        return res.status(400).json({ error: { message:  'No result found' } })
    }
}

    // For Advance Search
    // retrieve data from query?
    const {name, source, uniprot, length_from, length_to,
        nuc_acid, type,
        method, temp_from, temp_to, ph_from, ph_to,
        dg_wild_from, dg_wild_to, ddg_from, ddg_to, page
    } = req.query

    // protein_name	protein_source	uniprot_id	mutation_protein temperature


     // Protein Information: protein_name protein_source length mutation_protein		uniprot_id	
    
    // Nucleic Acid: nucleic_acid_name	type_nuc

    // Experimenetal Condition: pH	temperature method

    //Thermodynamic Parameters: dG_wild(kcal/mol) ddG	

    // References: year	authors	journal
    

    protein_info_filter(name,source,uniprot,length_from,length_to)
    
    nuc_acid_filter(nuc_acid, type);

    experimental_condition_filter(method, temp_from, temp_to, ph_from, ph_to)

    thermo_param_filter(dg_wild_from, dg_wild_to, ddg_from, ddg_to)

    // TODO: add the other filters
    // console.log(query)

    
    query.take = 10
    query.skip = 10*page

    // console.log(query)

    var result = await prisma.project.findMany(query)
    // console.log(result.length)

    delete query.take
    delete query.skip
    var cr = await prisma.project.findMany(query)
    count = cr.length

    const fix_bigINT_data = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    const data = JSON.parse(fix_bigINT_data)    

    
    console.log(query)
    res.status(200).json({data: data, total_count: count, total:
        JSON.parse( JSON.stringify(cr, (_, v) => typeof v === 'bigint' ? v.toString() : v))})



    
}