import { Document, model, Schema } from 'mongoose';

var districtSchema = new Schema({
    name: {type: String, required: true , unique:true},
    name_local: {type: String},
    slug: {type: String, required: true ,unique:true},
    local_slug: {type: String},
    banner: {type: String},
    logo: {type: String},
    status: {type: Number, default: 1}, // 1 = active , 2 = inactive
}, {timestamps: true});

const District = model('district', districtSchema);

export default District;
