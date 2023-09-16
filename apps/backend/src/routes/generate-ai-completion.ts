import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '~/lib/prisma'
import { openAI } from '~/lib/openai'
export async function generateAICompletionRoute(app: FastifyInstance) {
  app.post('/ai/complete', async (request, reply) => {
    const schemas = {
      body: z.object({
        videoId: z.string({ required_error: 'VideoId is Required' }).uuid(),
        template: z.string({ required_error: 'Template is Required' }),
        temperature: z.number().min(0).max(1).default(0.5),
      }),
    }

    const bodyValidation = schemas.body.safeParse(request.body)

    if (!bodyValidation.success) {
      console.log(bodyValidation.error.issues)
      const errors = bodyValidation.error.issues.map((err) => err.message + '.')

      return reply.status(400).send({ error: errors })
    }

    const { videoId, template, temperature } = bodyValidation.data

    const video = await prisma.video.findUniqueOrThrow({
      where: { id: videoId },
    })

    if (!video.transcription) {
      return reply
        .status(400)
        .send({ error: 'Video transcription was not generated yet.' })
    }

    const promptMessage = template.replace(
      '{transcription}',
      video.transcription,
    )

    const response = await openAI.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [{ role: 'user', content: promptMessage }],
    })

    return response
  })
}
