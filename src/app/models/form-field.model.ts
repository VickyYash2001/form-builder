export enum FormFieldType {
  Text = 'text',
  Textarea = 'textarea',
  Number = 'number',
  Email = 'email',
  Date = 'date',
  Time = 'time',
  Datetime = 'datetime',
  Select = 'select',
  Radio = 'radio',
  Checkbox = 'checkbox',
  Multiselect = 'multiselect',
  File = 'file'
}

export interface FormField {
  id: string;
  type: FormFieldType;
  name?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  accept?: string;
  maxSize?: number;
}
