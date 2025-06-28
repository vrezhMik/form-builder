import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setFormName } from "../../store/formBuilderSlice";
function FormSettingsComponent() {
  const dispatch = useDispatch();
  const formName = useSelector(
    (state: RootState) => state.formBuilder.formName
  );
  return (
    <div className="w-full space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Form Name:
        </label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formName}
          onChange={(e) => dispatch(setFormName(e.target.value))}
          placeholder="Enter form name"
        />
      </div>
    </div>
  );
}

export default FormSettingsComponent;
