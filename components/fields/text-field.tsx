"use client"

import React, { useEffect, useState } from 'react'
import { ElementsType, FormElement, FormElementInstance, FormElements, submitValuesType } from '../form-elements'
import { MdTextFields } from "react-icons/md"
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
import { Switch } from '../ui/switch'
import { cn } from '@/lib/utils'

const type: ElementsType = "TextField"

const extraAttributes = {
        label: "Text Field",
        helperText: "helper text",
        required: false,
        placeholder: "here..",
    }

const propertiesSchema = z.object({
  label: z.string().max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
})

export const TextFieldFormElement:FormElement = {
  type,

  construc: (id:string) =>({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field"
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: String):boolean =>{
    const element = formElement as CustomeInstance
    if(element.extraAttributes.required){
      return currentValue.length>0
    }
    return true
  }
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
      label: element.extraAttributes.label,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
      helperText: element.extraAttributes.helperText
    }
  })

  useEffect(()=> {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: PropertiesSchemaType) => {
    const { label, required, placeholder, helperText} = values
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        placeholder
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
        name="label"
        render={({field}) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
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
         <FormField
        control={form.control}
        name="placeholder"
        render={({field}) => (
          <FormItem>
            <FormLabel>Placeholder</FormLabel>
            <FormControl>
              <Input {...field} onKeyDown={(e) =>{
                if(e.key === "Enter") e.currentTarget.blur()
              }}/>
            </FormControl>
            <FormDescription>
              It is a placeholder of field
            </FormDescription>
            <FormMessage/>
          </FormItem>
  )}
        />
         <FormField
        control={form.control}
        name="helperText"
        render={({field}) => (
          <FormItem>
            <FormLabel>HelperText</FormLabel>
            <FormControl>
              <Input {...field} onKeyDown={(e) =>{
                if(e.key === "Enter") e.currentTarget.blur()
              }}/>
            </FormControl>
            <FormDescription>
              It is a helperText of field
            </FormDescription>
            <FormMessage/>
          </FormItem>
  )}
        />
        <FormField
        control={form.control}
        name="required"
        render={({field}) => (
          <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
            <div className='space-y-0.5'>
            <FormLabel>Required</FormLabel>
            
            <FormDescription>
              It is a helperText of field
            </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange}/>
            </FormControl>
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

  const { label, placeholder, required, helperText } = element.extraAttributes
  return(
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder}/>
      {helperText && (
        <p className='text-[0.8rem] text-muted-foreground'>{helperText}</p>
      )}
    </div>
  )
}

function FormComponent({elementInstance, submitValues, isInvalid, defaultValue}: {
  elementInstance: FormElementInstance,
  submitValues?: submitValuesType,
  isInvalid?: boolean,
  defaultValue?: string}){

  const element = elementInstance as CustomeInstance
  const [value, setValue] = useState(defaultValue||"")
  const [error, setError] = useState(false)

  useEffect(()=>{
    setError(isInvalid === true)
  }, [isInvalid])

  const { label, placeholder, required, helperText } = element.extraAttributes
  return(
    <div className='flex flex-col gap-2 w-full'>
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Input 
      className={cn(error && "text-red-500")}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => {
        if(!submitValues) return
        const valid = TextFieldFormElement.validate(element, e.target.value)
        setError(!valid)
        if(!valid) return
        submitValues(element.id, e.target.value)
      }}
      value={value}/>
      {helperText && (
        <p className={cn('text-[0.8rem] text-muted-foreground',
        error && "text-red-500")}>{helperText}</p>
      )}
    </div>
  )
}
