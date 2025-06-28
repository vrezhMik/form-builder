import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormField } from "../form-builder/FormField";
import { arrayMove } from "@dnd-kit/sortable";

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
    addField: (
      state,
      action: PayloadAction<{ field: FormField; atIndex?: number }>
    ) => {
      const { field, atIndex } = action.payload;
      if (atIndex !== undefined) {
        state.fields.splice(atIndex, 0, field);
      } else {
        state.fields.push(field);
      }
    },

    reorderFields: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      state.fields = arrayMove(
        state.fields,
        action.payload.oldIndex,
        action.payload.newIndex
      );
    },

    updateField: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<FormField> }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.id);
      if (field) {
        Object.assign(field, action.payload.updates);
      }
    },

    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter((f) => f.id !== action.payload);
    },

    setSelectedFieldId: (state, action: PayloadAction<string | null>) => {
      state.selectedFieldId = action.payload;
    },
  },
});

export const {
  addField,
  reorderFields,
  updateField,
  removeField,
  setSelectedFieldId,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
