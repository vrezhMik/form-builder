import { useSelector } from "react-redux";
import FormPreview from "./FormPreview";
import { RootState } from "../../store";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function FormEditor() {
  const form = useSelector((state: RootState) => state.formBuilder);

  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const [searchParams] = useSearchParams();
  const formIdFromUrl = searchParams.get("id");
  useEffect(() => {
    if (saveStatus !== "idle") {
      setSaveStatus("idle");
    }
  }, [form.formName, form.fields, saveStatus]);
  const saveForm = async () => {
    const formName =
      form.formName.trim().length === 0 ? `Custom Form` : form.formName;

    const isEditing = Boolean(formIdFromUrl);
    const method = isEditing ? "PUT" : "POST";

    const url = isEditing
      ? `${process.env.REACT_APP_API_URL}/forms/${formIdFromUrl}`
      : `${process.env.REACT_APP_API_URL}/forms`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formName,
          fields: form.fields,
        }),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      const data = await response.json();
      setSaveStatus("success");

      if (!isEditing && data._id) {
        navigate(`/formBuilder?id=${data._id}`);
      }

      setTimeout(() => setSaveStatus("idle"), 1500);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 1500);
    }
  };

  return (
    <div className="w-full border rounded px-4 py-6 sm:px-8 md:px-12 lg:px-20 lg:py-10">
      <div className="flex justify-end mb-6 sm:mb-8 lg:mb-10">
        <button
          className={`px-4 py-2 rounded text-white transition-colors duration-300 ${
            saveStatus === "success"
              ? "bg-green-600 hover:bg-green-700"
              : saveStatus === "error"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={saveForm}
        >
          {saveStatus === "success"
            ? "Saved"
            : saveStatus === "error"
            ? "Error Saving"
            : "Save"}
        </button>
      </div>
      <FormPreview />
    </div>
  );
}

export default FormEditor;
