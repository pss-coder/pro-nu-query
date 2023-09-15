// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client"



export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const {name} = req.query
  // console.log(req.query)

  // For getting column data
  const result = await prisma.project.findMany({
    select: {
      [name]: true
    }
  })
    
  const data = result.flatMap(item => item[Object.keys(item)[0]])
  const uniqueSet = new Set(data)
  var unique = [...uniqueSet]

  // set a col id on each result
  var counter = 1
  unique = unique.map(item => {
    return {
      id: counter++, 
      search: item
    }
  })
  

  res.status(200).json({data: unique})
}
