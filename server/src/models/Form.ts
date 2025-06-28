import { Schema, model } from "mongoose";

const formSchema = new Schema(
  {
    name: { type: String, default: "" },
    fields: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default model("Form", formSchema);
