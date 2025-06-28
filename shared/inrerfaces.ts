export type FieldType = "text" | "number" | "checkbox" | "select";

export interface FormFieldSettings {
  width: number;
  placeholder?: string;
  forceNewRow?: boolean;
  options?: string[];
  defaultOption?: string;
  checkboxTemplate?: "row" | "column";
}
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  settings: FormFieldSettings;
  required: boolean;
}
