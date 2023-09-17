import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'

let ffmpeg: FFmpeg | null = null

export async function getFFmpeg() {
  if (ffmpeg) return ffmpeg

  ffmpeg = new FFmpeg()

  // ffmpeg.on('log', (log) => {
  //   console.log('ffmpeg log', log)
  // })

  if (!ffmpeg.loaded) {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'
    try {
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          'text/javascript',
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          'application/wasm',
        ),
        // workerURL: await toBlobURL(
        //   `${baseURL}/ffmpeg-worker.js`,
        //   'text/javascript',
        // ),
      })
    } catch (error) {
      console.error('FFmpeg Load Error 😣: ', error) //eslint-disable-line
      ffmpeg = null
      throw new Error('Fail to load ffmpeg')
    }
  }

  return ffmpeg
}
