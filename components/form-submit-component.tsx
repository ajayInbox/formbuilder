"use client"

import React, { useCallback, useRef, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from './form-elements'
import { Button } from './ui/button'
import { HiCursorClick } from 'react-icons/hi'
import { toast } from './ui/use-toast'
import { ImSpinner2 } from 'react-icons/im'
import { SubmitForm } from '@/actions/form'

export default function FormSubmitComponent({formUrl, content}: {
  formUrl: string,
  content: FormElementInstance[]
}) {

  const formValues = useRef<{ [key: string]: string} >({})
  const formErrors = useRef<{ [key: string]: boolean} >({})
  const[renderKey, setRenderKey] = useState(new Date().getTime())

  const[submitted, setSubmitted] = useState(false)
  const[pending, startTransition] = useTransition()

  const validateForm = useCallback(() =>{
    for(const field of content){
      const actualValue = formValues.current[field.id]||""
      const valid = FormElements[field.type].validate(field, actualValue)

      if(!valid){
        formErrors.current[field.id] = true
      }
    }

    if(Object.keys(formErrors.current).length>0){
      return false
    }
    return true
  }, [content])
  const submitValues = useCallback((key: string, value: string) => {
    formValues.current[key] = value
  }, [])

  const submitForm = async() =>{
    formErrors.current = {}
    const validForm = validateForm()
    if(!validForm){
      setRenderKey(new Date().getTime())
      toast({
        title: "Error",
        description: "Some error occured",
        variant: "destructive"
      })
      return
    }

    try {
      const jsonContent = JSON.stringify(formValues.current)
      await SubmitForm(formUrl, jsonContent)
      setSubmitted(true)
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      })
    }

  }

  if(submitted){
    return(
      <div className="flex justify-center items-center h-full w-full p-8">
        <div className="max-w-[620px] flex flex-col flex-grow gap-4 bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className='text-2xl font-bold'>FOrm Submitted</h1>
          <p className="text-muted-foreground">
            You have submitted the form now youcan close the page
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
      <div key={renderKey} className="max-w-[620px] flex flex-col flex-grow gap-4 bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
        {
          content.map((element) =>{
            const FormElement = FormElements[element.type].formComponent
            return <FormElement key={element.id} 
              elementInstance={element} 
              submitValues={submitValues}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
              />
          })
        }
        <Button className='mt-8'
          onClick={() =>{
            startTransition(submitForm)
          }}>
            {!pending && (
              <>
                <HiCursorClick className="mr-2"/>
                Submit
              </>
            )}
            {pending && (
              <ImSpinner2/>
            )}
        </Button>
      </div>
    </div>
  )
}
