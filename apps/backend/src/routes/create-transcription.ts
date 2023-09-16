import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { createReadStream } from 'node:fs'

import { prisma } from '~/lib/prisma'
import { openAI } from '~/lib/openai'
export async function createTranscription(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (request, reply) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    })
    const paramsValidation = paramsSchema.safeParse(request.params)

    if (!paramsValidation.success) {
      return reply.status(400).send({ error: 'Video id is not valid' })
    }

    const { videoId } = paramsValidation.data

    const bodySchema = z.object({
      prompt: z.string(),
    })

    const bodyValidation = bodySchema.safeParse(request.body)

    if (!bodyValidation.success) {
      return reply.status(400).send({ error: 'Prompt string isRequired.' })
    }
    const { prompt } = bodyValidation.data

    const video = await prisma.video.findFirstOrThrow({
      where: { id: videoId },
    })

    const videoPath = video.path

    const audioReadStream = createReadStream(videoPath)

    const response = await openAI.audio.transcriptions.create({
      file: audioReadStream,
      model: 'whisper-1',
      language: 'pt',
      response_format: 'json',
      temperature: 0,
      prompt,
    })

    const transcription = response.text

    await prisma.video.update({
      where: { id: videoId },
      data: {
        transcription,
      },
    })

    return { transcription }
  })
}
