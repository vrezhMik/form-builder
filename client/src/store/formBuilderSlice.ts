import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormField } from "../form-builder/FormField";

interface FormBuilderState {
  fields: FormField[];
  selectedFieldId: string | null;
}

const initialState: FormBuilderState = {
  fields: [],
  selectedFieldId: null,
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addField: (state: FormBuilderState, action: PayloadAction<FormField>) => {
      state.fields.push(action.payload);
    },
    setSelectedFieldId: (state, action: PayloadAction<string | null>) => {
      state.selectedFieldId = action.payload;
    },
    updateField: (
      state: FormBuilderState,
      action: PayloadAction<{ id: string; updates: Partial<FormField> }>
    ) => {
      const field = state.fields.find(
        (f: FormField) => f.id === action.payload.id
      );
      if (field) {
        Object.assign(field, action.payload.updates);
      }
    },
    removeField: (state: FormBuilderState, action: PayloadAction<string>) => {
      state.fields = state.fields.filter(
        (f: FormField) => f.id !== action.payload
      );
    },
  },
});

export const { addField, updateField, removeField, setSelectedFieldId } =
  formBuilderSlice.actions;
export default formBuilderSlice.reducer;
