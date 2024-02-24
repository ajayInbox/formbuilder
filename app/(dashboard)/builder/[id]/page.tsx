import { getFormById } from '@/actions/form'
import FormBuilder from '@/components/form-builder'
import React from 'react'

export default async function BuilderPage({ params }: {params:{
    id: string,
}}) {

    const { id } = params
    const form = await getFormById(Number(id))

    if(!form){
        throw new Error("form not found")
    }

  return (
    <FormBuilder form={form}/>
  )
}
