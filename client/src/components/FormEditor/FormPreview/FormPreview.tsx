import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  FieldType,
  createFormField,
  FormField,
} from "../../../form-builder/FormField";
import { addField, reorderFields } from "../../../store/formBuilderSlice";
import { groupFieldsIntoRows } from "../../../utils/groupFieldsIntoRows";

import FieldPreviewSortable from "./FieldPreviewSortable";

function FormPreview() {
  const fields = useSelector((state: RootState) => state.formBuilder.fields);
  const rows = groupFieldsIntoRows(fields);

  const dispatch = useDispatch();

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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      dispatch(reorderFields({ oldIndex, newIndex }));
    }
  };

  return (
    <div
      className="w-full h-full min-h-[300px] border rounded p-4"
      onDrop={handleDropFromSidebar}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-semibold mb-2">Form Preview</h2>

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
              <div key={rowIndex} className="flex flex-wrap gap-2 mb-2">
                {row.map((field) => (
                  <FieldPreviewSortable key={field.id} field={field} />
                ))}
              </div>
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

export default FormPreview;
