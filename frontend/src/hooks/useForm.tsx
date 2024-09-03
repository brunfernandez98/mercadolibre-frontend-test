/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

type FormState<T> = {
  [K in keyof T]: T[K]
}

export const useForm = <T,>(initialState: FormState<T>) => {
  const [formValues, setFormValues] = useState(initialState)

  const resetForm = () => {
    setFormValues(initialState)
  }

  const setFieldValue = (field: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }))
  }

  return { formValues, resetForm, setFieldValue }
}
