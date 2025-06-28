import { useState } from "react";
function SidebarMenuComponent() {
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const inputs = [
    { lable: "Add fields" },
    { lable: "Input Options" },
    { lable: "Form Settings" },
  ];

  return (
    <div className="w-full">
      <div>
        {inputs.map((input, index) => {
          return (
            <button
              className={`h-20 w-4/12 bg-blue-${
                index == currentMenu ? "100" : "50"
              }`}
              onClick={() => {
                setCurrentMenu(index);
              }}
            >
              {input.lable}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SidebarMenuComponent;
