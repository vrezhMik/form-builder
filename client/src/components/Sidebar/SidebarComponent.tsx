import FieldsComponent from "../Builder/FieldsComponent";
import SidebarMenuComponent from "./SidebarMenu/SidebarMenuComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import InputOptionsComponent from "../Builder/InputOptionsComponent";
function SidebarComponent() {
  const currentTab = useSelector(
    (state: RootState) => state.sidebar.currentTab
  );
  return (
    <div className="w-3/12 bg-blue-100 h-screen">
      <SidebarMenuComponent />
      <div className="p-10">
        {currentTab == 0 && <FieldsComponent />}
        {currentTab == 1 && <InputOptionsComponent />}
      </div>
    </div>
  );
}

export default SidebarComponent;
