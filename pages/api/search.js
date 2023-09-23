import { PrismaClient } from "@prisma/client"

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
            gte: parseFloat(temp_from),
            lte: parseFloat(temp_to)
        }
    }
    if (ph_from && ph_to) {
        query.where.pH = {
            gte: parseFloat(ph_from),
            lte: parseFloat(ph_to)
        }
    }

    if(method) {
        query.where.method = method
    }


}

function thermo_param_filter(dg_wild_from, dg_wild_to, ddg_from, ddg_to) {
    
    if (dg_wild_from && dg_wild_to) {
        query.where.dG_wild_kcal_mol_ = {
            gte: parseFloat(dg_wild_from),
            lte: parseFloat(dg_wild_to)
        }
    }

    if (ddg_from && ddg_to) {
        query.where.ddG = {
            gte: parseFloat(ddg_from),
            lte: parseFloat(ddg_to)
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
    
    query.take = 10
    query.skip = 10*page

    console.log(query)

    var result = await prisma.project.findMany(query)

    const fix_bigINT_data = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    const data = JSON.parse(fix_bigINT_data)    

    res.status(200).json({data: data})



    
}