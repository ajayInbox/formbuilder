"use client"

import React, { useEffect, useState } from 'react'
import { ElementsType, FormElement, FormElementInstance, FormElements, submitValuesType } from '../form-elements'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDesigner } from '../hooks/use-designer'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LuHeading1 } from 'react-icons/lu'
import { BsTextParagraph } from 'react-icons/bs'
import { Textarea } from '../ui/textarea'

const type: ElementsType = "ParagraphField"

const extraAttributes = {
        text: "Text here.",
    }

const propertiesSchema = z.object({
  text: z.string().max(500),
})

export const ParagraphFieldFormElement:FormElement = {
  type,

  construc: (id:string) =>({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: BsTextParagraph,
    label: "Paragraph Field"
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true
}

type CustomeInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

type PropertiesSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent(
  {elementInstance}: {elementInstance: FormElementInstance}
){

  const element = elementInstance as CustomeInstance
  const { updateElement } = useDesigner()

  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      text: element.extraAttributes.text,
    }
  })

  useEffect(()=> {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: PropertiesSchemaType) => {
    const { text} = values
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text
      }
    })
  }
  return(
    <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)}
      onSubmit={(e) => e.preventDefault()}
      className='space-y-3'>
        <FormField
        control={form.control}
        name="text"
        render={({field}) => (
          <FormItem>
            <FormLabel>Text</FormLabel>
            <FormControl>
               <Textarea
                  rows={5}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
            </FormControl>
            <FormDescription>
              It is a label of field
            </FormDescription>
            <FormMessage/>
          </FormItem>
  )}
        />
      </form>
    </Form>
  )
}

function DesignerComponent({elementInstance}: {elementInstance: FormElementInstance}){

  const element = elementInstance as CustomeInstance

  const { text } = element.extraAttributes
  return(
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>
        Paragraph field
      </Label>
      <p>{text}</p>
    </div>
  )
}

function FormComponent({ elementInstance }: {
  elementInstance: FormElementInstance}){

  const element = elementInstance as CustomeInstance

  const { text } = element.extraAttributes
  return(
    <p>{text}</p>
  )
}
