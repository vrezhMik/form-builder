import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setFormName } from "../../store/formBuilderSlice";
function FormSettingsComponent() {
  const dispatch = useDispatch();
  const formName = useSelector(
    (state: RootState) => state.formBuilder.formName
  );
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Form Name:</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={formName}
          onChange={(e) => dispatch(setFormName(e.target.value))}
        />
      </div>
    </div>
  );
}

export default FormSettingsComponent;
