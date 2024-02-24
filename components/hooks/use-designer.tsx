"use client"

import React,{ useContext } from 'react'
import { DesignerContext } from '../context/designer-context'

export function useDesigner() {

    const context = useContext(DesignerContext)
    if(context === null){
        throw new Error("useDesigner must be used withing provider")
    }
  return context
}

