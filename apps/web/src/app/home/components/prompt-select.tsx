'use client'
import { FC } from 'react'
import useSWR from 'swr'

import { PromptDTO } from '~/app/dtos/PromptDTO'
import { api } from '~/libs/axios'

import * as Slt from '~/components/ui/select'

type PromptSelectProps = {
  onPromptSelect: (template: string) => void
}
export const PromptSelect: FC<PromptSelectProps> = ({ onPromptSelect }) => {
  const { data, isLoading } = useSWR(
    '/prompts',
    (url) => api.get(url).then((r) => r.data as PromptDTO[]),
    { shouldRetryOnError: false },
  )

  const handlePromptSelected = (promptId: string) => {
    const prompt = data?.find((i) => i.id === promptId)
    prompt && onPromptSelect(prompt.template)
  }

  return (
    <Slt.Select onValueChange={handlePromptSelected}>
      <Slt.SelectTrigger>
        <Slt.SelectValue placeholder="Select a prompt..." />
      </Slt.SelectTrigger>

      <Slt.SelectContent>
        {data?.map((item) => (
          <Slt.SelectItem key={item.id} value={item.id}>
            {item.title}
          </Slt.SelectItem>
        ))}
        {isLoading && (
          <Slt.SelectItem disabled value="">
            Loading...
          </Slt.SelectItem>
        )}
        {!isLoading && !data?.length && (
          <Slt.SelectFeedback>No options available</Slt.SelectFeedback>
        )}
      </Slt.SelectContent>
    </Slt.Select>
  )
}
