import React from "react";
import SidebarComponent from "../components/Sidebar/SidebarComponent";
import FormEditor from "../components/FormEditor/FormEditor";
function FormBuilder() {
  return (
    <>
      <div className="flex">
        <SidebarComponent />
        <FormEditor />
      </div>
    </>
  );
}

export default FormBuilder;
