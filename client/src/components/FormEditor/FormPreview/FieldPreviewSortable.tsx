import React, { useEffect, useRef } from "react";
import { FormField } from "../../../form-builder/FormField";
import { useDispatch } from "react-redux";
import { setCurrentTab } from "../../../store/sidebarSlice";
import { setSelectedFieldId } from "../../../store/formBuilderSlice";
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

  const handleClickCapture = () => {
    requestAnimationFrame(() => {
      if (!wasDragging.current) {
        dispatch(setSelectedFieldId(field.id));
        dispatch(setCurrentTab(1));
      }
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border p-3 rounded bg-gray-50 cursor-move"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handleClickCapture}
      {...attributes}
      {...listeners}
    >
      <label>{field.label}</label>
      {field.type === "text" && (
        <input
          type="text"
          className="w-full"
          placeholder={field.settings.placeholder}
        />
      )}
      {field.type === "number" && (
        <input
          type="number"
          className="w-full"
          placeholder={field.settings.placeholder}
        />
      )}
      {field.type === "checkbox" && <input type="checkbox" />}
      {field.type === "select" && <select className="w-full" />}
    </div>
  );
};

export default FieldPreviewSortable;
