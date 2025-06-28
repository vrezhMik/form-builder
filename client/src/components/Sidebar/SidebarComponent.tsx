import FieldsComponent from "../Builder/FieldsComponent";
import SidebarMenuComponent from "./SidebarMenuComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import InputOptionsComponent from "../Builder/InputOptionsComponent";
import FormSettingsComponent from "../Builder/FormSettingsComponent";
import { useNavigate } from "react-router-dom";
function SidebarComponent() {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/");
  };
  const currentTab = useSelector(
    (state: RootState) => state.sidebar.currentTab
  );
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-3/12 bg-blue-100 min-h-screen">
      <div className="flex justify-center py-5 font-extrabold text-blue-900 text-lg">
        <button onClick={redirect}>Form Builder</button>
      </div>

      <SidebarMenuComponent />

      <div className="p-4 sm:p-6 md:p-6">
        {currentTab === 0 && <FieldsComponent />}
        {currentTab === 1 && <InputOptionsComponent />}
        {currentTab === 2 && <FormSettingsComponent />}
      </div>
    </div>
  );
}

export default SidebarComponent;
