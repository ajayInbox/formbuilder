"use client"

import React, { ReactNode, createContext, useState } from 'react'
import { FormElementInstance } from '../form-elements'

type DesignerContextType = {
    elements: FormElementInstance[],
    setElements: React.Dispatch<React.SetStateAction<FormElementInstance[]>>,
    addElement: (index: number, element: FormElementInstance)=>void,
    removeElement: (id: string) =>void,

    selectedElement: FormElementInstance | null,
    setSelectedElement: React.Dispatch<React.SetStateAction<FormElementInstance | null>>, 

    updateElement: (id: string, element: FormElementInstance)=>void,
}

export const DesignerContext = createContext<DesignerContextType|null>(null)

export default function DesignerContextProvider({children}: {children: ReactNode}) {

    const[selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null)

    const[elements, setElements] = useState<FormElementInstance[]>([])

    const addElement = (index: number, element: FormElementInstance) =>{
        setElements((prev) => {
            const newElements = [...prev]
            newElements.splice(index, 0, element)
            return newElements
        })
    }

    const removeElement = (id: string) =>{
        setElements((prev) =>
            prev.filter((element) => element.id !== id)
        )
    }

    const updateElement = (id: string, element: FormElementInstance) =>{
        setElements((prev)=>{
            const newElement = [...prev]
            const index = newElement.findIndex((el) => el.id === id)
            newElement[index] = element
            return newElement
        })
    }
  return (
    <DesignerContext.Provider value={{elements, 
    setElements,
    addElement, 
    removeElement,
    selectedElement,
    setSelectedElement,
    updateElement}}>
        {children}
    </DesignerContext.Provider>
  )
}
