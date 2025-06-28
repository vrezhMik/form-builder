import type { FormField, FieldType } from "@shared/interfaces";

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
