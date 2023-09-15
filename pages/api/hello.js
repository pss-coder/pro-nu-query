// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client"



export default async function handler(req, res) {
  const prisma = new PrismaClient()
  // res.status(200).json({ name: 'John Doe' })

//   const result = await prisma.project.findMany({
//     select: {
//         protein_name: true
//     }, take: 5
// })

//   console.log("api is called")

//   const data = result.map((item) => {
//     return item
//     // return Number(id.id).toString()
// });

  // for proteinData
  // console.log(data[0].protein_name[0])

  const columns = [
    { id: 1, name: 'protein_name' },
    { id: 2, name: 'protein_source' },
    { id: 3, name: 'nucleic_acid_name' },
    { id: 4, name: 'type_nuc' },
    { id: 5, name: 'method' },
    { id: 6, name: 'journal' },
  ]

res.status(200).json({data: columns})

}
