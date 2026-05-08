import type { InjectionKey } from 'vue'
import type { Core, FormEngine } from '@skygraph/core'
import type { UseFormReturn } from '../../composables/useForm'

export interface FormContextValue {
  core: Core
  form: FormEngine
  formApi: UseFormReturn
  layout: 'horizontal' | 'vertical' | 'inline'
  size: 'small' | 'middle' | 'large'
  disabled: boolean
  labelCol?: number
  wrapperCol?: number
}

export const formContextKey = Symbol('sg-form-context') as InjectionKey<FormContextValue>
