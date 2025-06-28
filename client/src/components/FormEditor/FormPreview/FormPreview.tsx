// FormPreview.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { addField } from "../../../store/formBuilderSlice";
import {
  createFormField,
  FormField,
  FieldType,
} from "./../../../form-builder/FormField";

function FormPreview() {
  const fields = useSelector((state: RootState) => state.formBuilder.fields);
  const dispatch = useDispatch();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("field-type") as FieldType;

    if (type) {
      const newField = createFormField(type);
      dispatch(addField(newField));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full h-full min-h-[300px] border rounded p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-semibold mb-2">Form Preview</h2>
      {fields.length === 0 ? (
        <p className="text-gray-400">Drag fields here</p>
      ) : (
        <div className="flex flex-col gap-2">
          {fields.map((field: FormField) => (
            <div key={field.id} className="border p-3 rounded bg-gray-50">
              <label>{field.label}</label>
              {field.type === "text" && (
                <input type="text" className="w-full" />
              )}
              {field.type === "number" && (
                <input type="number" className="w-full" />
              )}
              {field.type === "checkbox" && <input type="checkbox" />}
              {field.type === "select" && <select className="w-full" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormPreview;
