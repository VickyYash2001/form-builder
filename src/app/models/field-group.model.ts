import { FormField } from './form-field.model';

export interface FieldGroup {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  required: boolean;
  min: number | null;
  max: number | null;
}
