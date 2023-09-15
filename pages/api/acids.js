import { PrismaClient } from "@prisma/client"


export default async function handler(req, res) {
    const prisma = new PrismaClient()
    
    const {column, value} = req.query
    console.log(column)
    console.log(value)
    const result = await prisma.project.findMany({
        where: {
            [column]: {
                hasSome: [value]
            }
            
        }
      })

      const dt = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)

      res.status(200).json({data: JSON.parse(dt)})
}