import { Document, model, Schema } from 'mongoose';


const TagSchema = new Schema(
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
        permalink:{
            type: String,
            required: false,
            unique: true,
        },
        status: {
            type: String,
            enum : ['Published', 'Pending',"Draft"],
            default: 'Published'
        },

    },
    { timestamps: true }
);

TagSchema.path('permalink').validate((val) => {
    let urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

const Tag = model('Product_Tag', TagSchema);


export  {Tag};
