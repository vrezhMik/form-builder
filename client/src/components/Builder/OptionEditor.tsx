interface OptionEditorProps {
  options: string[];
  newOption: string;
  setNewOption: (v: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  inputPlaceholder?: string;
}

const OptionEditor = ({
  options,
  newOption,
  setNewOption,
  onAdd,
  onRemove,
  inputPlaceholder = "New option",
}: OptionEditorProps) => (
  <>
    <ul className="space-y-1 mb-2">
      {options.map((opt, index) => (
        <li key={index} className="flex items-center justify-between">
          <span>{opt}</span>
          <button
            onClick={() => onRemove(index)}
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
        placeholder={inputPlaceholder}
        className="flex-1 border rounded px-2 py-1"
      />
      <button
        onClick={onAdd}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Add
      </button>
    </div>
  </>
);

export default OptionEditor;
