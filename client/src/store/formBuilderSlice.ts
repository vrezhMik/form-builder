import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createFormField,
  FormField,
  FieldType,
} from "../form-builder/FormField";

interface FormBuilderState {
  fields: FormField[];
}

const initialState: FormBuilderState = {
  fields: [],
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addField: (state: FormBuilderState, action: PayloadAction<FormField>) => {
      state.fields.push(action.payload);
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

export const { addField, updateField, removeField } = formBuilderSlice.actions;
export default formBuilderSlice.reducer;
