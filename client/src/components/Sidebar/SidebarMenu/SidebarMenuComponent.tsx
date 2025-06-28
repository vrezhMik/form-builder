import { useState } from "react";

function SidebarMenuComponent() {
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const menu_inputs = [
    { label: "Add fields" },
    { label: "Input Options" },
    { label: "Form Settings" },
  ];

  return (
    <div className="w-full">
      <div>
        {menu_inputs.map((input, index) => (
          <button
            key={index}
            className={`h-20 w-4/12 ${
              index === currentMenu ? "bg-blue-100" : "bg-blue-50"
            }`}
            onClick={() => setCurrentMenu(index)}
          >
            {input.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SidebarMenuComponent;
