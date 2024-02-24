import React, { useTransition } from 'react'
import { HiSaveAs } from "react-icons/hi"
import { Button } from './ui/button'
import { useDesigner } from './hooks/use-designer'
import { updateFormContent } from '@/actions/form'
import { toast } from './ui/use-toast'
import { FaSpinner } from "react-icons/fa"

export default function SaveFormBtn({id}: {id: number}) {

  const { elements } = useDesigner()
  const[loading, startTransition] = useTransition()

  const updateContent = async() =>{
    try {
      const jsonElements = JSON.stringify(elements)
      await updateFormContent(id, jsonElements)
      toast({
        title: "Success",
        description: "form saved successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      })
    }
    
  }

  return (
    <Button 
    disabled={loading}
    onClick={() => startTransition(updateContent)}
    variant="outline" className='gap-2'>
        <HiSaveAs className="h-4 w-4"/>
        Save
        {loading && <FaSpinner className="animate-spin"/>}
    </Button>
  )
}
