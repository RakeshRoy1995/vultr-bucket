import { Document, model, Schema } from 'mongoose';

interface ManufactureDocument extends Document {
    user: Schema.Types.ObjectId | string;
    name: string;
    image: string;
    serial: string;
    status: string;
    seo: string;



}

const ManufactureSchema = new Schema(
    {
        store_id: {
            type: String,
            default: 1
        },
        merchant_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
            // unique: true,
        },
        name: {
            type: String,
            required: true,

        },
        image: {
            type: String,
            required: false,
        },
        serial_number: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
        seo: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Manufacture = model<ManufactureDocument>('manufacture', ManufactureSchema);

export default Manufacture;
