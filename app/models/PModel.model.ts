import {  model, Schema } from 'mongoose';

const PModelSchema = new Schema(
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

const PModel = model('pmodel', PModelSchema);

export default PModel;
