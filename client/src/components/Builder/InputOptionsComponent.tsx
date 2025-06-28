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
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Label:</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={field.label}
          onChange={(e) =>
            updateFieldProp(dispatch, field.id, { label: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Placeholder:</label>
        <input
          type="text"
          value={field.settings.placeholder || ""}
          onChange={(e) =>
            updateFieldSettings(dispatch, field.id, field.settings, {
              placeholder: e.target.value,
            })
          }
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Required:</label>
        <button
          onClick={() =>
            updateFieldProp(dispatch, field.id, { required: !field.required })
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
            updateFieldSettings(dispatch, field.id, field.settings, {
              width: parseInt(e.target.value),
            })
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
            <label className="block text-sm font-medium">
              Checkbox Template:
            </label>
            <button
              onClick={() =>
                updateFieldSettings(dispatch, field.id, field.settings, {
                  checkboxTemplate:
                    field.settings.checkboxTemplate === "row"
                      ? "column"
                      : "row",
                })
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
                updateFieldSettings(dispatch, field.id, field.settings, {
                  defaultOption: e.target.value,
                })
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Options:</label>
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
