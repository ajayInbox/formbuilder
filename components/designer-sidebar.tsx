import React from 'react'
import FormElementsSidebar from './form-elements-sidebar'
import { useDesigner } from './hooks/use-designer'
import ElementPropertiesSidebar from './element-properties-sidebar'

export default function DesignerSidebar() {

  const { selectedElement } = useDesigner()
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      {!selectedElement && <FormElementsSidebar/>}
      {selectedElement && <ElementPropertiesSidebar/>} 
    </aside>
  )
}
