import React, { useEffect, useRef } from "react";
import type { FormField } from "@shared/inrerfaces";

import { useDispatch } from "react-redux";
import { setCurrentTab } from "../../store/sidebarSlice";
import { setSelectedFieldId, removeField } from "../../store/formBuilderSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CheckboxGroup from "./CheckboxGroup";
interface Props {
  field: FormField;
  error: string;
  value: any;
  onChange: (value: any) => void;
}

const FieldPreviewSortable: React.FC<Props> = ({
  field,
  error,
  value,
  onChange,
}) => {
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

  const errorClass = error ? "border-red-500" : "border-gray-300";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border p-3 rounded bg-gray-50 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClickCapture={handleClickCapture}
      {...attributes}
    >
      <div
        className="drag-handle cursor-move select-none text-gray-400 sm:pt-2"
        {...listeners}
      >
        ⠿
      </div>

      <div className="flex-1">
        <label className="block mb-1 font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {field.type === "text" && (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full py-1 px-2 border rounded ${errorClass}`}
            placeholder={field.settings.placeholder}
          />
        )}

        {field.type === "number" && (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full py-1 px-2 border rounded ${errorClass}`}
            placeholder={field.settings.placeholder}
          />
        )}

        {field.type === "checkbox" && (
          <CheckboxGroup
            options={field.settings.options || []}
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
            layout={
              field.settings.checkboxTemplate === "row" ? "row" : "column"
            }
          />
        )}

        {field.type === "select" && (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full border rounded px-2 py-1 ${errorClass}`}
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

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div
        className="text-red-500 cursor-pointer select-none sm:pt-2"
        onClick={() => dispatch(removeField(field.id))}
      >
        x
      </div>
    </div>
  );
};

export default FieldPreviewSortable;
