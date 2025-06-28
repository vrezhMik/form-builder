import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateField } from "../../store/formBuilderSlice";
import { useState } from "react";

function InputOptionsComponent() {
  const dispatch = useDispatch();
  const allFields = useSelector((state: RootState) => state.formBuilder.fields);

  const selectedFieldId = useSelector(
    (state: RootState) => state.formBuilder.selectedFieldId
  );
  const field = allFields.find((f) => f.id === selectedFieldId);
  const [newOption, setNewOption] = useState("");

  if (!field) return <p>No input selected</p>;

  const options = field.settings.options || [];
  const defaultOption = field.settings.defaultOption || "";

  const addOption = () => {
    if (!newOption.trim()) return;
    const updated = [...options, newOption.trim()];
    dispatch(
      updateField({
        id: field.id,
        updates: {
          settings: {
            ...field.settings,
            options: updated,
          },
        },
      })
    );
    setNewOption("");
  };

  const removeOption = (index: number) => {
    const updated = options.filter((_: string, i: number) => i !== index);
    dispatch(
      updateField({
        id: field.id,
        updates: {
          settings: {
            ...field.settings,
            options: updated,
          },
        },
      })
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Label:</label>

        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={field.label}
          onChange={(e) =>
            dispatch(
              updateField({ id: field.id, updates: { label: e.target.value } })
            )
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Placeholder:</label>
        <input
          type="text"
          value={field.settings.placeholder || ""}
          onChange={(e) =>
            dispatch(
              updateField({
                id: field.id,
                updates: {
                  settings: { ...field.settings, placeholder: e.target.value },
                },
              })
            )
          }
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Required:</label>
        <button
          onClick={() =>
            dispatch(
              updateField({
                id: field.id,
                updates: { required: !field.required },
              })
            )
          }
          className={`px-3 py-1 rounded text-white ${
            field.required
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {field.required ? "Deactivate" : "Activate"}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Row Width:</label>
        <select
          value={field.settings.width || "100"}
          onChange={(e) =>
            dispatch(
              updateField({
                id: field.id,
                updates: {
                  settings: {
                    ...field.settings,
                    width: parseInt(e.target.value),
                  },
                },
              })
            )
          }
          className="w-full border rounded px-2 py-1"
        >
          <option value="30">30%</option>
          <option value="49">50%</option>
          <option value="100">100%</option>
        </select>
      </div>
      {field.type === "checkbox" && (
        <>
          <div>
            <label className="block text-sm font-medium">
              Checkbox Options:
            </label>
            <ul className="space-y-1 mb-2">
              {options.map((opt: string, index: number) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" disabled />
                    <span>{opt}</span>
                  </div>
                  <button
                    onClick={() => removeOption(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex gap-2">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="New option label"
                className="flex-1 border rounded px-2 py-1"
              />
              <button
                onClick={addOption}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Checkbox Template:
            </label>
            <button
              onClick={() =>
                dispatch(
                  updateField({
                    id: field.id,
                    updates: {
                      settings: {
                        ...field.settings,
                        checkboxTemplate:
                          field.settings.checkboxTemplate === "row"
                            ? "column"
                            : "row",
                      },
                    },
                  })
                )
              }
              className="px-3 py-1 rounded text-white bg-green-600 hover:bg-green-700"
            >
              {field.settings.checkboxTemplate === "row" ? "Column" : "Row"}
            </button>
          </div>
        </>
      )}

      {field.type === "select" && (
        <>
          <div>
            <label className="block text-sm font-medium">
              Default Option Text:
            </label>
            <input
              type="text"
              value={defaultOption}
              onChange={(e) =>
                dispatch(
                  updateField({
                    id: field.id,
                    updates: {
                      settings: {
                        ...field.settings,
                        defaultOption: e.target.value,
                      },
                    },
                  })
                )
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Options:</label>
            <ul className="space-y-1 mb-2">
              {options.map((opt: string, index: number) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{opt}</span>
                  <button
                    onClick={() => removeOption(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex gap-2">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="New option"
                className="flex-1 border rounded px-2 py-1"
              />
              <button
                onClick={addOption}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InputOptionsComponent;
