import React from 'react'
import { Button } from './ui/button'
import { MdPreview } from "react-icons/md"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDesigner } from './hooks/use-designer'
import { FormElements } from './form-elements'


export default function PreviewDialogBtn() {

  const { elements } = useDesigner()

  return (
    <Dialog>
      <DialogTrigger>
        <Button className='gap-2' variant={"outline"}>
          <MdPreview className="h-6 w-6"/>
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
        <div className='px-4 py-2 border-b'>
          <p className='text-lg font-bold text-muted-foreground'>Form Preview</p>
        </div>
        <div className='bg-accent flex flex-col items-center flex-grow justify-center p-4 bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)] overflow-y-auto'>
          <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto'>
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent
              return <FormComponent key={element.id} elementInstance={element}/>
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
