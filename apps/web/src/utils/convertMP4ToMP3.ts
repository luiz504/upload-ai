/* eslint-disable no-console */
import { fetchFile } from '@ffmpeg/util'
import { getFFmpeg } from '~/app/libs/ffmpeg'

export async function convertMP4ToMP3(videoFile: File) {
  console.log('convert Started', videoFile.type)

  const ffmpeg = await getFFmpeg()

  await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile))

  ffmpeg.on('progress', (progress) => {
    console.log('Convert progress:' + Math.round(progress.progress * 100) + '%')
  })

  await ffmpeg.exec([
    '-i',
    'input.mp4',
    '-map',
    '0:a',
    '-b:a',
    '20k',
    '-acodec',
    'libmp3lame',
    'output.mp3',
  ])

  const data = await ffmpeg.readFile('output.mp3')

  const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
  const audioFile = new File([audioFileBlob], 'audio.mp3', {
    type: 'audio/mpeg',
  })

  console.log('Convert audio finished.')
  return audioFile
}
