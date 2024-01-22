import { Document, model, Schema } from 'mongoose';


const AttributesGroupSchema = new Schema(
    {
        store_id: {
            type: String,
            default:1
        },
        merchant_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "User",
            // unique: true,
          },
        name: {
            type: String,
            required: true,
            // unique: true,
        },
        serial: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum : ['Published', 'Pending',"Draft"],
            default: 'Draft'
        },

    },
    { timestamps: true }
);

const AttributesGroup = model('attributesGroup', AttributesGroupSchema);

export default AttributesGroup;
