import { model, Schema } from 'mongoose';

var productReviewSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product' , require : true},
    user: {type: Schema.Types.ObjectId, ref: 'user', require : true },
    score: {type: Number , require : true },
    review_text: {type: String , require : true},
    order_id: {type: Schema.Types.ObjectId , ref: "Order" , require : true },
    images: [
        {
            actual_img: {type: String},
            mid_img: {type: String},
            thumb_img: {type: String},
        },
    ],
    reply_for: {type: Schema.Types.ObjectId, ref: 'ProductReview', default: null},
}, {timestamps: true});


const productReview = model('product_review', productReviewSchema);
const userSchema = new Schema({}, { strict: false });
const User = model('user', userSchema);

export default productReview;