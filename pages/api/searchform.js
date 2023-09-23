export default async function handler(req, res) {
    const colindex = req.query['column[id]']
    const column = req.query['column[name]']
    const value = req.query.value
    console.log(req.query)

    const {Name, Source, UniProt, from, to} = req.query
    if(Name) {
        res.redirect(307, `/results/?name=${Name}&source=${Source}&uniprot=${UniProt}&from=${from}&to=${to}`)
        return
    }

    // column: props.column.name,
    //             colindex: props.column.id-1, // get colindex not id => index = id - 1
    //             // valindex: props.selected.id,
    //             value: props.selected
    res.redirect(307, `/results/?column=${column}&colindex=${colindex-1}&value=${value}`)
}