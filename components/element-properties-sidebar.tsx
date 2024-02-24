import React from 'react'
import { useDesigner } from './hooks/use-designer'
import { FormElements } from './form-elements'
import { Button } from './ui/button'
import { AiOutlineClose } from "react-icons/ai"
import { Separator } from './ui/separator'

export default function ElementPropertiesSidebar() {

    const { selectedElement, setSelectedElement } = useDesigner()
    if(!selectedElement) return null

    const ProperTiesForm = FormElements[selectedElement?.type].propertiesComponent

  return (
    <div className='flex flex-col p-2'>
        <div className='flex justify-between items-center'>
            <p className='text-sm text-foreground/70'>
                Element Properties
            </p>
            <Button size={"icon"} variant={"ghost"} onClick={() => setSelectedElement(null)}>
                <AiOutlineClose/>
            </Button>
        </div>
        <Separator/>
        <ProperTiesForm elementInstance={selectedElement}/>
    </div>
    
  )
}
