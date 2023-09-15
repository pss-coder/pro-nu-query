import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getAllAcidIds() {

    const data = await prisma.project.findMany({
        select: {
            id: true
        }
    })

    // each element must have params
    return data.map((id) => {
        return {
            params: {
              id: Number(id.id).toString()
            },
          };
    });
}

export async function getAcidData(id) {
    const data = await prisma.project.findMany({
        where: {
            id : id
        }, 
    })

    //fix bigint issue
    const dt = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v)

    return {
        dt
    }
    
}

