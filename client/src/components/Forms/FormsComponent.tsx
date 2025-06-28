import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setSelectedFieldId } from "../../store/formBuilderSlice";
interface Form {
  _id: string;
  name: string;
}

function FormsComponent() {
  const navigate = useNavigate();

  const [forms, setForms] = useState<Form[]>([]);
  const fetchedRef = useRef(false);
  const dispatch = useDispatch();

  const removeForm = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/forms/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to remove: ${response.status}`);
      }

      setForms((prevForms) => prevForms.filter((form) => form._id !== id));
    } catch (error) {
      console.error("❌ Error deleting form:", error);
    }
  };

  const editForm = (id: string) => {
    dispatch(setSelectedFieldId(id));
    navigate(`/formBuilder?id=${id}`);
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const getForms = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/forms`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Failed to get forms: ${response.status}`);
        }

        const data: Form[] = await response.json();
        setForms(data);
      } catch (error) {
        console.error("❌ Error fetching forms:", error);
      }
    };

    getForms();
  }, []);

  return (
    <div className="py-10 px-20">
      <div className="flex flex-wrap gap-6">
        {forms.map((form) => (
          <div key={form._id} className="w-64 border rounded p-4 shadow">
            <div className="mb-2">
              <img
                src={"/placeholder.webp"}
                alt={form.name}
                className="w-full h-auto"
              />
            </div>
            <div className="mb-2">
              <h2 className="font-semibold text-lg">{form.name}</h2>
            </div>
            <div className="flex justify-end gap-x-3">
              <button
                className="bg-green-500 rounded py-2 px-4 text-white hover:bg-green-700"
                onClick={() => {
                  editForm(form._id);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 rounded py-2 px-4 text-white hover:bg-red-700"
                onClick={() => removeForm(form._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormsComponent;
