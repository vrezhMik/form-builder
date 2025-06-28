import React, { useEffect, useRef } from "react";
import { FormField } from "../../form-builder/FormField";
import { useDispatch } from "react-redux";
import { setCurrentTab } from "../../store/sidebarSlice";
import { setSelectedFieldId } from "../../store/formBuilderSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  field: FormField;
}

const FieldPreviewSortable: React.FC<Props> = ({ field }) => {
  const dispatch = useDispatch();
  const wasDragging = useRef(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: `${field.settings.width || 100}%`,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      wasDragging.current = false;
    }, 0);
    return () => clearTimeout(timeout);
  }, [isDragging]);

  const handlePointerDown = () => {
    wasDragging.current = false;
  };

  const handlePointerMove = () => {
    wasDragging.current = true;
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".drag-handle")) return;

    if (!wasDragging.current) {
      dispatch(setSelectedFieldId(field.id));
      dispatch(setCurrentTab(1));
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border p-3 rounded bg-gray-50 flex items-start gap-2"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClickCapture={handleClickCapture}
      {...attributes}
    >
      <div
        className="drag-handle cursor-move select-none text-gray-400"
        {...listeners}
      >
        ⠿
      </div>

      {/* Field content */}
      <div className="flex-1">
        <label>
          {field.label}{" "}
          {field.required && <span className="text-red-500">*</span>}
        </label>

        {field.type === "text" && (
          <input
            type="text"
            required={field.required}
            className="w-full py-1 px-2"
            placeholder={field.settings.placeholder}
          />
        )}
        {field.type === "number" && (
          <input
            type="number"
            required={field.required}
            className="w-full"
            placeholder={field.settings.placeholder}
          />
        )}
        {field.type === "checkbox" && (
          <div
            className={`${
              field.settings.checkboxTemplate === "row"
                ? "flex gap-4 items-center"
                : "block space-y-1"
            }`}
          >
            {(field.settings.options || []).map((opt: string, i: number) => (
              <label key={i} className="flex items-center gap-2 align-center">
                <input type="checkbox" />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        )}
        {field.type === "select" && (
          <select
            className="w-full border rounded px-2 py-1"
            required={field.required}
          >
            {field.settings.defaultOption && (
              <option value="">{field.settings.defaultOption}</option>
            )}
            {(field.settings.options || []).map(
              (opt: string, index: number) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              )
            )}
          </select>
        )}
      </div>
    </div>
  );
};

export default FieldPreviewSortable;
