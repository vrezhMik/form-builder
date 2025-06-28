import { FormField } from "../form-builder/FormField";

export function groupFieldsIntoRows(fields: FormField[]): FormField[][] {
  const rows: FormField[][] = [];
  let currentRow: FormField[] = [];
  let currentWidth = 0;

  for (const field of fields) {
    const width = field.settings.width || 100;

    if (currentWidth + width > 100) {
      rows.push(currentRow);
      currentRow = [field];
      currentWidth = width;
    } else {
      currentRow.push(field);
      currentWidth += width;
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}
