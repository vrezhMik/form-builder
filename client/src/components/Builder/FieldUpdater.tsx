import { updateField } from "../../store/formBuilderSlice";
import { AppDispatch } from "../../store";

export const updateFieldSettings = (
  dispatch: AppDispatch,
  fieldId: string,
  currentSettings: any,
  newSettings: Partial<typeof currentSettings>
) => {
  dispatch(
    updateField({
      id: fieldId,
      updates: {
        settings: {
          ...currentSettings,
          ...newSettings,
        },
      },
    })
  );
};

export const updateFieldProp = (
  dispatch: AppDispatch,
  fieldId: string,
  updates: Record<string, any>
) => {
  dispatch(updateField({ id: fieldId, updates }));
};
