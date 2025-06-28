export default function FieldsComponent() {
  const inputs = [
    { label: "Text" },
    { label: "Number" },
    { label: "Checkbox" },
    { label: "Select" },
  ];

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    type: string
  ) => {
    e.dataTransfer.setData("field-type", type.toLowerCase());
  };

  return (
    <div className=" flex flex-wrap gap-x-5 gap-y-5">
      {inputs.map((input, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, input.label)}
          className="w-5/12 text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-move"
        >
          {input.label}
        </div>
      ))}
    </div>
  );
}
