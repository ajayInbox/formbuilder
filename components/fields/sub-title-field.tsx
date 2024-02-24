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
import { LuHeading1, LuHeading2 } from 'react-icons/lu'

const type: ElementsType = "SubTitleField"

const extraAttributes = {
        SubTitle: "SubTitle Field",
    }

const propertiesSchema = z.object({
  SubTitle: z.string().max(50),
})

export const SubTitleFieldFormElement:FormElement = {
  type,

  construc: (id:string) =>({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: LuHeading2,
    label: "SubTitle Field"
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
      SubTitle: element.extraAttributes.SubTitle,
    }
  })

  useEffect(()=> {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: PropertiesSchemaType) => {
    const { SubTitle} = values
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        SubTitle
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
        name="SubTitle"
        render={({field}) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} onKeyDown={(e) =>{
                if(e.key === "Enter") e.currentTarget.blur()
              }}/>
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

  const { SubTitle } = element.extraAttributes
  return(
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>
        SubTitle field
      </Label>
      <p className='text-lg'>{SubTitle}</p>
    </div>
  )
}

function FormComponent({ elementInstance }: {
  elementInstance: FormElementInstance}){

  const element = elementInstance as CustomeInstance

  const { SubTitle } = element.extraAttributes
  return(
    <p className='text-lg'>{SubTitle}</p>
  )
}
