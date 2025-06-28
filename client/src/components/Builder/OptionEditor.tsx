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
    <ul className="space-y-2 mb-4">
      {options.map((opt, index) => (
        <li key={index} className="flex items-center justify-between text-sm">
          <span>{opt}</span>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>

    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        placeholder={inputPlaceholder}
        className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={onAdd}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
      >
        Add
      </button>
    </div>
  </>
);

export default OptionEditor;
