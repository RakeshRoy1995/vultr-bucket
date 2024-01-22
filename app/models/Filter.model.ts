import { Document, model, Schema } from 'mongoose';


const FilterSchema = new Schema(
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
        type:{
            type: String,
            requered:true,
        },
        serial: {
            type: Number,
            required: false,
        },
        values:[
            {
              type: Schema.Types.ObjectId,
              ref: "FilterValues",
            },
          ],
        status: {
            type: String,
            enum: ["Published", "Pending", "Draft"],
            default: "Published",
          },

    },
    { timestamps: true }
);

const filterValuesSchema = new Schema({ 

    name: {
        type: String,
        required: false,
        // unique: true,
    },
    serial:Number,

    filterBy: { 

        type: Schema.Types.ObjectId, 

        ref: "Filter"

    } 
})
const Filter = model('Filter', FilterSchema);
const Filtervalues = model('FilterValues', filterValuesSchema);

export  {Filter,Filtervalues};
