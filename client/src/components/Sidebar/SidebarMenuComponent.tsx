import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCurrentTab } from "../../store/sidebarSlice";

function SidebarMenuComponent() {
  const dispatch = useDispatch();
  const currentTab = useSelector(
    (state: RootState) => state.sidebar.currentTab
  );
  const menu_inputs = [
    { label: "Add fields" },
    { label: "Input Options" },
    { label: "Form Settings" },
  ];
  const handleTabClick = (index: number) => {
    dispatch(setCurrentTab(index));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap">
        {menu_inputs.map((input, index) => (
          <button
            key={index}
            className={`h-20 flex-1 min-w-[50%] sm:min-w-[33.33%] md:min-w-[25%] border
          ${index === currentTab ? "bg-blue-100" : "bg-blue-50"}`}
            onClick={() => handleTabClick(index)}
          >
            {input.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SidebarMenuComponent;
