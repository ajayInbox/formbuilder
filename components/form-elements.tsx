import React, { ReactNode } from 'react'
import { TextFieldFormElement } from './fields/text-field'
import { TitleFieldFormElement } from './fields/title-field'
import { SubTitleFieldFormElement } from './fields/sub-title-field'
import { ParagraphFieldFormElement } from './fields/paragraph-field'
import { SeparatorFieldFormElement } from './fields/separator-field'
import { SpaceFieldFormElement } from './fields/space-field'
import { NumberFieldFormElement } from './fields/number-field'
import { DateFieldFormElement } from './fields/date-field'
import { TextAreaFormElement } from './fields/textarea-field'
import { SelectFieldFormElement } from './fields/select-field'
import { CheckboxFieldFormElement } from './fields/checkbox-field'

export type ElementsType = "TextField"
|"TitleField"
|"SubTitleField"
|"ParagraphField"
|"SeparatorField"
|"SpaceField"
|"NumberField"
|"DateField"
|"TextAreaField"
|"SelectField"
|"CheckboxField"

export type submitValuesType = (key: string, value: string) => void

export type FormElement = {
    type: ElementsType,

    construc: (id:string) => FormElementInstance

    designerBtnElement: {
        icon: React.ElementType,
        label: string
    }
    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>,
    formComponent:React.FC<{
        elementInstance: FormElementInstance
        submitValues?: (key: string, value: string) => void
        isInvalid?: boolean,
        defaultValue?: string
    }>,
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance
    }>,
    validate: (formElement: FormElementInstance, currentValue: string) => boolean
}

export type FormElementInstance ={
    id: string,
    type: ElementsType,
    extraAttributes?: Record<string,any>
}

type FormElementsType = {
    [key in ElementsType]: FormElement
}

export const FormElements = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpaceField: SpaceFieldFormElement,
    NumberField: NumberFieldFormElement,
    DateField: DateFieldFormElement,
    TextAreaField: TextAreaFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField: CheckboxFieldFormElement
}
