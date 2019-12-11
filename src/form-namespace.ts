namespace Form {
  export type FormType = 'inline' | 'block'
  export type FormState = 'active' | 'disabled'

  export interface FormInfo {
    type: FormType
    state: FormState
  }
}
