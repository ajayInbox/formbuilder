"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
} from "@/components/ui/form"
import { BsFileEarmarkPlus} from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { Button } from '@/components/ui/button' 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { formSchema, formSchemaType } from '@/schemas/form-schemas'
import { createForm } from '@/actions/form'
import { useRouter } from "next/navigation"


export default function CreateFormBtn() {

    const router = useRouter()

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async(values: formSchemaType) =>{
        try{
            const formId = await createForm(values)
            toast({
                title: "Success",
                description: "Form created successfully."
            })
            console.log("form id: "+ formId)
            router.push(`/builder/${formId}`)

        }catch(err){
            toast({
                title: "Error",
                description: "something went wrong, please try later.",
                variant: "destructive"
            })
        }
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button
                variant={'outline'}
                className='group border border-primary/70 h-[190px] flex flex-col items-center justify-center hover:border-primary hover:cursor-pointer border-dashed gap-4'>
                    <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary"/>
                    <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>
                        Create new form
                    </p>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Form</DialogTitle>
                <DialogDescription>
                    create a form and start collecting responses
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='description'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea rows={5} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </form>
            </Form>
            <DialogFooter>
                <Button 
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={form.formState.isSubmitting} className='w-full mt-4'>
                    {!form.formState.isSubmitting && <span>Save</span>}
                    {form.formState.isSubmitting && <ImSpinner2 className=" animate-spin"/>}
                </Button>
            </DialogFooter> 
        </DialogContent>
    </Dialog>
  )
}
