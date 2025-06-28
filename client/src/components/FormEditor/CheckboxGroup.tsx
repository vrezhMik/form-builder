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
        layout === "row" ? "flex gap-4 items-center" : "block space-y-1"
      }
    >
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-2 align-center">
          <input
            type="checkbox"
            checked={value.includes(opt)}
            onChange={(e) => handleToggle(opt, e.target.checked)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
