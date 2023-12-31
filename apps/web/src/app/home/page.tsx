'use client'
import { useState } from 'react'
import { Wand2 } from 'lucide-react'
import { useCompletion } from 'ai/react'

import { api } from '~/libs/axios'

import { Textarea } from '~/components/ui/textarea'
import { Separator } from '~/components/ui/separator'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import * as Slt from '~/components/ui/select'
import { Slider } from '~/components/ui/slider'

import { Header } from './components/header'
import { VideoInputForm } from './components/video-input-form'
import { PromptSelect } from './components/prompt-select'

const Home = () => {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const handleVideoUploaded = (videoId: string | null) => {
    setVideoId(videoId)
  }

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: `${api.defaults.baseURL}/ai/complete`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-1 p-6 gap-6">
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Enter a prompt for the AI..."
              value={input}
              onChange={handleInputChange}
            />

            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Result generated by the AI..."
              value={completion}
              readOnly
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Tip: You can use the{' '}
            <code className="text-violet-400">{'{transcription}'}</code>{' '}
            variable on your prompt to add the transcription content of the
            selected video.
          </p>
        </div>

        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={handleVideoUploaded} />

          <Separator />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Label>Prompt</Label>

              <PromptSelect onPromptSelect={setInput} />

              <span className="block text-xs text-muted-foreground italic">
                You will be able to customize this option soon...
              </span>
            </div>

            <Separator />
            <div className="space-y-4">
              <Label>Model</Label>

              <Slt.Select disabled defaultValue="gpt3.5">
                <Slt.SelectTrigger>
                  <Slt.SelectValue />
                </Slt.SelectTrigger>

                <Slt.SelectContent>
                  <Slt.SelectItem value="gpt3.5">
                    GPT 3.5-turbo 16k
                  </Slt.SelectItem>
                </Slt.SelectContent>
              </Slt.Select>

              <span className="block text-xs text-muted-foreground italic">
                You will be able to customize this option soon...
              </span>
            </div>
            <Separator />

            <div className="space-y-4">
              <Label>Temperature</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Higher values lean the results more creative and possible
                errors.
              </span>
            </div>

            <Separator />

            <Button className="w-full gap-2" type="submit" disabled={isLoading}>
              Execute <Wand2 className="w-4 h-4" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
export default Home
