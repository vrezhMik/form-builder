import React, { useEffect } from "react";
import type { FormField } from "@shared/inrerfaces";

import { useDispatch } from "react-redux";
import { setSelectedFieldId } from "../../store/formBuilderSlice";
import { setCurrentTab } from "../../store/sidebarSlice";

interface Props {
  field: FormField;
}

const FieldPreview: React.FC<Props> = ({ field }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Field updated:", field);
  }, [field]);
  return (
    <div
      className="border p-3 rounded bg-gray-50 cursor-pointer"
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button === 0) {
          dispatch(setSelectedFieldId(field.id));
          dispatch(setCurrentTab(1));
        }
      }}
      style={{ width: `${field.settings.width}%` }}
    >
      <label htmlFor="">{field.label}</label>
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

export default React.memo(FieldPreview, (prev, next) => {
  return JSON.stringify(prev.field) === JSON.stringify(next.field);
});
