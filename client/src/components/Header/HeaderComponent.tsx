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
    <header className="py-10 px-20 border-b bg-white">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleClick}
      >
        Add new form +
      </button>
    </header>
  );
}
