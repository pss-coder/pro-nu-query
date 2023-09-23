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
    const {name, source, uniprot, from, to} = req.query
    // id	

    // Protein Information: protein_name protein_source length mutation_protein		uniprot_id	
    
    // Nucleic Acid: nucleic_acid_name	type_nuc

    // Experimenetal Condition: pH	temperature method

    //Thermodynamic Parameters: dG_wild(kcal/mol) ddG	

    // References: year	authors	journal
    if(name) {
        res.redirect(307, `/results/?name=${name}&source=${source}&uniprot=${uniprot}&from=${from}&to=${to}`)
        return
    }
}