import { useSelector } from "react-redux";
import FormPreview from "./FormPreview";
import { RootState } from "../../store";

function FormEditor() {
  const form = useSelector((state: RootState) => state.formBuilder);
  const formId = useSelector(
    (state: RootState) => state.formBuilder.formIdCounter
  );
  const saveForm = async () => {
    const formName =
      form.formName.trim().length === 0
        ? `Custom Form #${formId}`
        : form.formName;

    try {
      const response = await fetch("http://localhost:5001/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formName,
          fields: form.fields,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save form: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Form saved:", data);
    } catch (error) {
      console.error("❌ Error saving form:", error);
    }
  };

  return (
    <div className="py-10 px-20 w-full border rounded">
      <div className="flex justify-end mb-10">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={saveForm}
        >
          Save
        </button>
      </div>
      <FormPreview />
    </div>
  );
}

export default FormEditor;
