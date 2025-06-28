import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import OptionEditor from "./OptionEditor";
import { updateFieldProp, updateFieldSettings } from "./FieldUpdater";

function InputOptionsComponent() {
  const dispatch = useDispatch();
  const fields = useSelector((state: RootState) => state.formBuilder.fields);
  const selectedId = useSelector(
    (state: RootState) => state.formBuilder.selectedFieldId
  );

  const field = fields.find((f) => f.id === selectedId);
  const [newOption, setNewOption] = useState("");

  if (!field) return <p>No input selected</p>;

  const options = field.settings.options || [];
  const defaultOption = field.settings.defaultOption || "";

  const addOption = () => {
    const optionTrimmed = newOption.trim();
    if (!optionTrimmed) return;
    updateFieldSettings(dispatch, field.id, field.settings, {
      options: [...options, optionTrimmed],
    });
    setNewOption("");
  };

  const removeOption = (index: number) => {
    updateFieldSettings(dispatch, field.id, field.settings, {
      options: options.filter((_option: string, i: number) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Label:
        </label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={field.label}
          onChange={(e) =>
            updateFieldProp(dispatch, field.id, { label: e.target.value })
          }
        />
      </div>

      {/* Placeholder */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Placeholder:
        </label>
        <input
          type="text"
          value={field.settings.placeholder || ""}
          onChange={(e) =>
            updateFieldSettings(dispatch, field.id, field.settings, {
              placeholder: e.target.value,
            })
          }
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Required */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Required:
        </label>
        <button
          type="button"
          onClick={() =>
            updateFieldProp(dispatch, field.id, { required: !field.required })
          }
          className={`px-4 py-2 rounded text-white transition-colors duration-200 ${
            field.required
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {field.required ? "Deactivate" : "Activate"}
        </button>
      </div>

      {/* Row Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Row Width:
        </label>
        <select
          value={field.settings.width || "100"}
          onChange={(e) =>
            updateFieldSettings(dispatch, field.id, field.settings, {
              width: parseInt(e.target.value),
            })
          }
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="30">30%</option>
          <option value="49">50%</option>
          <option value="100">100%</option>
        </select>
      </div>

      {/* Checkbox specific settings */}
      {field.type === "checkbox" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Checkbox Options:
            </label>
            <OptionEditor
              options={options}
              newOption={newOption}
              setNewOption={setNewOption}
              onAdd={addOption}
              onRemove={removeOption}
              inputPlaceholder="New option label"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Checkbox Template:
            </label>
            <button
              type="button"
              onClick={() =>
                updateFieldSettings(dispatch, field.id, field.settings, {
                  checkboxTemplate:
                    field.settings.checkboxTemplate === "row"
                      ? "column"
                      : "row",
                })
              }
              className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700"
            >
              {field.settings.checkboxTemplate === "row" ? "Column" : "Row"}
            </button>
          </div>
        </>
      )}

      {/* Select specific settings */}
      {field.type === "select" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Option Text:
            </label>
            <input
              type="text"
              value={defaultOption}
              onChange={(e) =>
                updateFieldSettings(dispatch, field.id, field.settings, {
                  defaultOption: e.target.value,
                })
              }
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options:
            </label>
            <OptionEditor
              options={options}
              newOption={newOption}
              setNewOption={setNewOption}
              onAdd={addOption}
              onRemove={removeOption}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default InputOptionsComponent;
