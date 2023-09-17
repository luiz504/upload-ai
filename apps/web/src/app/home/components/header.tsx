import { FC } from 'react'
import { Github } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

export const Header: FC = () => {
  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <h1 className="text-xl font-bold">upload.ai</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Developed with 💜</span>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="outline" className="gap-2">
          <Github className="w-4 h-4" /> Github
        </Button>
      </div>
    </header>
  )
}
