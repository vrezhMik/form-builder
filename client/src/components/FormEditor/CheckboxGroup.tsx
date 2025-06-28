interface CheckboxGroupProps {
  options: string[];
  value: string[];
  onChange: (newValue: string[]) => void;
  layout: "row" | "column";
}

const CheckboxGroup = ({
  options,
  value,
  onChange,
  layout,
}: CheckboxGroupProps) => {
  const handleToggle = (option: string, checked: boolean) => {
    const newValue = [...value];
    if (checked) {
      if (!newValue.includes(option)) newValue.push(option);
    } else {
      const index = newValue.indexOf(option);
      if (index !== -1) newValue.splice(index, 1);
    }
    onChange(newValue);
  };

  return (
    <div
      className={
        layout === "row"
          ? "flex flex-wrap gap-x-4 gap-y-2 items-center"
          : "flex flex-col gap-2"
      }
    >
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={value.includes(opt)}
            onChange={(e) => handleToggle(opt, e.target.checked)}
            className="accent-blue-600"
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
