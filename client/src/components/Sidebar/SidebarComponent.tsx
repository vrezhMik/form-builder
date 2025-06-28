import FieldsComponent from "../Builder/FieldsComponent";
import SidebarMenuComponent from "./SidebarMenu/SidebarMenuComponent";
function SidebarComponent() {
  return (
    <div className="w-3/12 bg-blue-100 h-screen">
      <SidebarMenuComponent />
      <FieldsComponent />
    </div>
  );
}

export default SidebarComponent;
