import sanitizeHtml from "sanitize-html";
import type { FormField } from "@shared/inrerfaces";

export function sanitizeField(field: FormField): FormField {
  return {
    ...field,
    label: sanitizeHtml(field.label || "", {
      allowedTags: [],
      allowedAttributes: {},
    }),
    settings: {
      ...field.settings,
      placeholder: sanitizeHtml(field.settings?.placeholder || "", {
        allowedTags: [],
        allowedAttributes: {},
      }),
      options: Array.isArray(field.settings?.options)
        ? field.settings.options.map((opt: string) =>
            sanitizeHtml(opt, { allowedTags: [], allowedAttributes: {} })
          )
        : [],
      defaultOption: sanitizeHtml(field.settings?.defaultOption || "", {
        allowedTags: [],
        allowedAttributes: {},
      }),
    },
  };
}

export function sanitizeFormInput(
  name: string,
  fields: FormField[]
): { name: string; fields: FormField[] } {
  return {
    name: sanitizeHtml(name || "", { allowedTags: [], allowedAttributes: {} }),
    fields: fields.map(sanitizeField),
  };
}
