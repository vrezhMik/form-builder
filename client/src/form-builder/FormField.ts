export type FieldType = "text" | "number" | "checkbox" | "select";
export interface FormFieldSettings {
  width: number;
  placeholder?: string;
  forceNewRow?: boolean;
  options?: string[];
  defaultOption?: string;
}
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  settings: FormFieldSettings;
  required: boolean;
}

export function createFormField(type: FieldType): FormField {
  return {
    id: crypto.randomUUID(),
    type,
    label: "",
    required: false,
    settings: {
      width: 100,
      placeholder: "",
      forceNewRow: false,
      options: [],
      defaultOption: "",
    },
  };
}
