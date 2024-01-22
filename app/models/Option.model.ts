import { Document, model, Schema } from "mongoose";

const OptionSchema = new Schema(
  {
    store_id: {
      type: String,
      default: 1,
    },
    merchant_id: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
      // unique: true,
    },
    name: {
      type: String,
      required: false,
      // unique: true,
    },
    type: {
      type: String,
      required: true,
    },

    serial: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      default: "Published",
    },
    values: [
      {
        type: Schema.Types.ObjectId,
        ref: "OptionValues",
      },
    ],
  },
  { timestamps: true }
);

const valuesSchema = new Schema({
  name: {
    type: String,
    required: false,
    // unique: true,
  },
  serial: Number,

  optionBy: {
    type: Schema.Types.ObjectId,

    ref: "Option",
  },
});
const Option = model("Option", OptionSchema);
const OptionValues = model("OptionValues", valuesSchema);

export { Option, OptionValues };
