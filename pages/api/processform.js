export default async function handler(req, res) {

    // Process Simple Search
    const isSimple = req.query.isSimple == 'on' ? true : false
    
    if(isSimple) {
        const colindex = req.query['column[id]']
        const column = req.query['column[name]']
        const value = req.query.value
        res.redirect(307, `/results/?column=${column}&colindex=${colindex-1}&value=${value}&issimple=${isSimple}`)
        return
    } else {
        
    }

   // Process Advance Search
    const {name, source, uniprot, length_from, length_to,
        nuc_acid, type,
        method, temp_from, temp_to, ph_from, ph_to,
        dg_wild_from, dg_wild_to, ddg_from, ddg_to
    } = req.query
    // id	

    // Protein Information: protein_name protein_source length mutation_protein		uniprot_id	
    
    // Nucleic Acid: nucleic_acid_name	type_nuc

    // Experimenetal Condition: pH	temperature method

    //Thermodynamic Parameters: dG_wild(kcal/mol) ddG	

    // References: year	authors	journal
    if(name) {
        const url = '/results/?'+new URLSearchParams(req.query).toString()
        // `/results/?name=${name}&source=${source}&uniprot=${uniprot}&from=${from}&to=${to}
        res.redirect(307, url)
        return
    }
}