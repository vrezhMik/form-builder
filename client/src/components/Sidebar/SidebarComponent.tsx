import FieldsComponent from "../Builder/FieldsComponent";
import SidebarMenuComponent from "./SidebarMenuComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import InputOptionsComponent from "../Builder/InputOptionsComponent";
import FormSettingsComponent from "../Builder/FormSettingsComponent";
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
        {currentTab == 2 && <FormSettingsComponent />}
      </div>
    </div>
  );
}

export default SidebarComponent;
