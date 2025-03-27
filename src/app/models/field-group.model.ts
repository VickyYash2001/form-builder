import { FormField } from './form-field.model';

export interface FieldGroup {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
}
