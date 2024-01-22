import { Document, model, Schema } from 'mongoose';
import { features } from 'process';


const BrandSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        merchant_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "User",
            // unique: true,
          },
        description: {
            type: String,
            required: false,
        },
        website:{
            type: String,
            required: false,
            unique: false,
        },
        status: {
            type: String,
            enum : ['Published', 'Pending',"Draft"],
            default: 'Published'
        },
        order:{
            type: Number,
            required:false,
            unique:false
        },
        permalink:{
            type: String,
            required: false,
            unique: true,
        },
        feature:{
            type: Boolean,
            requered:false
        },
        image: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);
BrandSchema.path('permalink').validate((val) => {
    let urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

const Brand = model('Product_Brand', BrandSchema);


export  {Brand};
