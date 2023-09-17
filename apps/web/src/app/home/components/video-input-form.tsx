'use client'
import { ChangeEvent, FC, FormEvent, useMemo, useRef, useState } from 'react'
import { FileVideo, Upload } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Textarea } from '~/components/ui/textarea'
import { convertMP4ToMP3 } from '~/utils/convertMP4ToMP3'
import { api } from '~/libs/axios'

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages: Omit<Record<Status, string>, 'waiting'> = {
  converting: 'Converting...',
  uploading: 'Uploading...',
  generating: 'Generating Transcriptions...',
  success: 'Uploaded!',
}

type VideoInputFormProps = {
  onVideoUploaded: (videoId: string | null) => void
}

export const VideoInputForm: FC<VideoInputFormProps> = ({
  onVideoUploaded,
}) => {
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('waiting')

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    if (!files) return

    const selectFile = files[0]

    setVideoFile(selectFile)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return null

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  const handleUploadVideo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) return

    try {
      setStatus('converting')
      const audioFile = await convertMP4ToMP3(videoFile)

      const data = new FormData()
      data.append('file', audioFile)

      setStatus('uploading')
      const response = await api.post('/videos', data)

      const videoId = response.data.video.id
      setStatus('generating')
      await api.post(`/videos/${videoId}/transcription`, {
        prompt,
      })
      setStatus('success')
      onVideoUploaded(videoId)
    } catch (error) {
      setStatus('waiting')

      console.error('err', error)//eslint-disable-line
    }
  }

  const interactionDisabled = status !== 'waiting'

  return (
    <form className="space-y-6" onSubmit={handleUploadVideo}>
      <label
        className="relative flex flex-col items-center justify-center border border-dashed rounded-md aspect-video cursor-pointer text-sm gap-2 text-muted-foreground hover:bg-primary/5"
        htmlFor="video"
      >
        {!previewURL ? (
          <>
            <FileVideo className="w-4 h-4" />
            Select a Video
          </>
        ) : (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        )}
      </label>

      <input
        className="sr-only"
        type="file"
        id="video"
        accept="video/mp4"
        onChange={handleFileSelected}
        disabled={interactionDisabled}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Transcription prompt</Label>

        <Textarea
          className="h-20 leading-relaxed resize-none"
          ref={promptInputRef}
          id="transcription_prompt"
          placeholder="Include key words mentioned in the video separated by comma (,)"
          disabled={interactionDisabled}
        />
      </div>

      <Button
        data-success={status === 'success'}
        className="gap-2 w-full data-[success=true]:bg-emerald-700"
        type="submit"
        disabled={interactionDisabled}
      >
        {status === 'waiting' ? (
          <>
            Upload Video <Upload className="w-4 h-4" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  )
}
