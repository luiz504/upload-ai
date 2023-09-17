'use client'
import { ChangeEvent, FC, FormEvent, useMemo, useRef, useState } from 'react'
import { FileVideo, Upload } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Textarea } from '~/components/ui/textarea'
import { convertMP4ToMP3 } from '~/utils/convertMP4ToMP3'

export const VideoInputForm: FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

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

    const audioFile = await convertMP4ToMP3(videoFile)

    console.log('Audio File', { audioFile, prompt }) //eslint-disable-line 

    // convert the video to audio
  }

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
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Transcription prompt</Label>

        <Textarea
          ref={promptInputRef}
          className="h-20 leading-relaxed resize-none"
          id="transcription_prompt"
          placeholder="Include key words mentioned in the video separated by comma (,)"
        />
      </div>

      <Button type="submit" className="gap-2 w-full">
        Upload Video <Upload className="w-4 h-4" />
      </Button>
    </form>
  )
}
