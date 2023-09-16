import { PrismaClient } from "@prisma/client"


// display rows after search
export default async function handler(req, res) {
    const prisma = new PrismaClient()
    
    const {column, value, page} = req.query
    if(!column || !value || !page) {
        return res.status(400).json({ error: { message:  'No result found' } })
    }
    // if(!column && !value) {res.status(404).JSON({error: 'missing column or value'})}
    var result = null
    if(column == 'protein_name') {
        result = await prisma.project.findMany({
            where: {
                [column]: {
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
    console.log(data)
    if(data.length > 0 ) {
        return res.status(200).json({data: data})
    } else {
        return res.status(400).json({ error: { message:  'No result found' } })
    }

    
}