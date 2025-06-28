export type FieldType = "text" | "number" | "checkbox" | "select";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  settings: Record<string, any>;
  required: boolean;
}

export function createFormField(type: FieldType): FormField {
  return {
    id: crypto.randomUUID(),
    type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    settings: {},
    required: false,
  };
}
