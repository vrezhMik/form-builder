import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { FieldType, createFormField } from "../../form-builder/FormField";
import { addField, reorderFields } from "../../store/formBuilderSlice";
import { groupFieldsIntoRows } from "../../utils/groupFieldsIntoRows";
import { useState } from "react";
import FieldPreviewSortable from "./FieldPreviewSortable";

function FormPreview() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fields = useSelector((state: RootState) => state.formBuilder.fields);
  const rows = groupFieldsIntoRows(fields);
  const formName = useSelector(
    (state: RootState) => state.formBuilder.formName
  );
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const formId = useSelector(
    (state: RootState) => state.formBuilder.formIdCounter
  );
  const dispatch = useDispatch();
  const displayName =
    formName.trim() !== "" ? formName : `Custom Form #${formId}`;
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDropFromSidebar = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("field-type") as FieldType;
    if (type) {
      const newField = createFormField(type);
      dispatch(addField({ field: newField }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: "" }));

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      dispatch(reorderFields({ oldIndex, newIndex }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    for (const field of fields) {
      const value = formData[field.id];
      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (field.type === "checkbox" && value === false);

      if (field.required && isEmpty) {
        newErrors[field.id] = "This field is required";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true); // ✅ Mark successful submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="w-full h-full min-h-[300px] border rounded p-4"
        onDrop={handleDropFromSidebar}
        onDragOver={handleDragOver}
      >
        <h2 className="text-lg font-semibold mb-2">
          Form Preview: {displayName}
        </h2>

        {rows.length === 0 ? (
          <p className="text-gray-400">Drag fields here</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={rectSortingStrategy}
            >
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex flex-wrap gap-2 mb-2 justify-between"
                >
                  {row.map((field) => (
                    <FieldPreviewSortable
                      key={field.id}
                      field={field}
                      value={
                        formData[field.id] ||
                        (field.type === "checkbox" ? [] : "")
                      }
                      onChange={(value) => handleChange(field.id, value)}
                      error={errors[field.id]}
                    />
                  ))}
                </div>
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
      <button
        type="submit"
        className={`px-4 py-2 rounded mt-4 text-white transition-colors duration-300 ${
          isSubmitted
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitted ? "Submitted" : "Submit"}
      </button>
    </form>
  );
}

export default FormPreview;
