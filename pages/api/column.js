// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/lib/prisma"

// get column data
export default async function handler(req, res) {
  const {name} = req.query
  

  // For getting column data
  const result = await prisma.project.findMany({
    select: {
      [name]: true
    }
  })
    
  // clean column data for UI
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
