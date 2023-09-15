import { FastifyInstance } from 'fastify'
import { prisma } from '~/lib/prisma'

export async function getAllPrompts(app: FastifyInstance) {
  app.get('/prompts', async () => {
    const prompts = await prisma.prompt.findMany({ skip: 0, take: 30 })

    return prompts
  })
}
