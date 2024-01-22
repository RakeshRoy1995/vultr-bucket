import { Document, model, Schema } from 'mongoose';

interface StockDocument extends Document {
    user: Schema.Types.ObjectId | string;
    name: string;
    status: string;
    merchant_id: string;




}

const StockSchema = new Schema(
    {
        merchant_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "User"
            // unique: true,
        },
        name: {
            type: String,
            required: false,

        },
        status: {
            type: String,
            required: false,
        },
    },

    { timestamps: true }
);

const Stock = model<StockDocument>('stock', StockSchema);

export default Stock;
