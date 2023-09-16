import { fastify } from 'fastify'

import { getAllPrompts } from '~/routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscription } from './routes/create-transcription'

const app = fastify()

app.register(getAllPrompts)
app.register(uploadVideoRoute)
app.register(createTranscription)

app
  .listen({ port: 3333 })
  .then(() => console.log('HTTP Server Running! 🚀🚀🚀'))
