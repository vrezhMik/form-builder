import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFormBuilder } from "../../store/formBuilderSlice";
export default function HeaderComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(resetFormBuilder());
    navigate("/formBuilder");
  }
  return (
    <header className="px-4 sm:px-6 md:px-10 lg:px-20 py-6 sm:py-8 md:py-10 border-b bg-white">
      <button
        className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleClick}
      >
        Add new form +
      </button>
    </header>
  );
}
