import React, {useTransition} from 'react'
import { MdOutlinePublish } from "react-icons/md"
import { Button } from './ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FaIcons } from "react-icons/fa"
import { toast } from './ui/use-toast'
import { publishFormContent } from '@/actions/form'
import { useRouter } from "next/navigation"

export default function PublishFormBtn({id}: {id:number}) {

  const[loading, startTransition] = useTransition()
  const router = useRouter()

  async function publishForm() {
    try {
      await publishFormContent(id)
      toast({
        title: "Success",
        description: "form publish successfully"
      })
      router.refresh()
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'>
          <MdOutlinePublish className="h-4 w-4"/>
        Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can not be undone <br/> <br/>
            <span className='font-medium'> after publishing you can collect submissions</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={(e) =>{
            e.preventDefault()
            startTransition(publishForm)
          }}> Proceed {loading && <FaIcons className="animate-spin"/>}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    
  )
}
