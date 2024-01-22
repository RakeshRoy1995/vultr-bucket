import { model, Schema } from 'mongoose';

let ProductSchema = new Schema(
    {

        user: {
            type: Schema.Types.ObjectId, ref: "user", require: true
        },
        store_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Store"

        },
        name: {
            type: String,
            required: true,
            // unique: true,
        },

        date_available: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },

        short_description: {
            type: String,
            required: true,
        },

        meta_title: {
            type: String
        },

        price: {
            type: Number,
            default: 0
        },

        brand: {
            type: Schema.Types.ObjectId,
            ref: "Product_Brand"
        },

        quantity: {
            type: Number,
            default: 0
            // unique: true,
        },
        status: {
            type: String,
            enum: ['Published', 'Pending', "Draft" , "deleted"],
            default: 'Draft'
        },

        images: {
            type: Array,
            required: true,
            // unique: true,
        },
        meta_description: {
            type: String,
        },
        meta_keyword: {
            type: String,
        },   
        is_feature: {
            type: Boolean,
            default: false
        },

        bulk_available: {
            type: Boolean,
            default: false
        },

        bulk: {
            min_qty : Array ,
            max_qty : Array ,
            price : Array ,
        },

        tag: {
            type: Array
        },

        model: {
            type: String,
            require: true
        },

        sku: {
            type: String
            // unique: true,
        },
        upc: {
            type: String,
        },
        ean: {
            type: String,
        },
        jan: {
            type: String,
        },

        isbn: {
            type: String
        },

        mpn: {
            type: String,
        },
        collections: [{type: Schema.Types.ObjectId, ref: 'Collection'}],
        location: {
            type: String
            // unique: true,
        },
        cost_price: {
            type: Number, default: 0,
        },

        calculable_price: {
            type: Number, default: 0,
        },

        has_discount: {
            type: Boolean, default: false
        },

        discount: {
            type: Number, default: 0,
        },

        discount_type: {
            type: String,
        },
        tax_class_id: {
            type: String,
        },
        minimum_qty: {
            type: Number,
        },

        subtract: {
            type: Number
        },

        stock_status_id: {
            type: Schema.Types.ObjectId,
            ref: "stock"
        },
        type: {
            type: String,
        },
        package_type: {
            type: String,
        },

        shipping: {
            type: Number
            // unique: true,
        },
        length: {
            type: Number,
        },
        points: {
            type: Number,
        },

        product_reward: {
            type: Array
        },

        product_special: {
            type: Array,
            require: true
        },

        product_discount: {
            type: Array
            // unique: true,
        },
        product_option_value: {
            type: Array,
        },
        product_attribute: {
            type: Array,
        },
        related: {
            type: Array,
        },

        filter: {
            type: String
        },

        category: {
            type: Array,
        },

        manufacturer: {
            type: String
            // unique: true,
        },
        sort_order: {
            type: Number,
        },
        manufacturer_id: {
            type: String,
        },
        weight_class_id: {
            type: String,
        },

        weight: {
            type: Number
        },

        length_class_id: {
            type: String,
        },

        product_seo_url: {
            type: String,
        },

        product_layout: {
            type: String,
        },

        height: {
            type: Number
        },
        width: {
            type: Number,
        },

        warranty_type: {
            type: String,
        },

        warranty_period: {
            type: String,
        },

        warranty_policy: {
            type: String,
        },

        dangerous_goods: {
            type: String,
        },

        box_content: {
            type: String,
        },

        video_url: {
            type: String,
        },
        t_orders: {type: Number, default: 0},


    },
    { timestamps: true }
);

const StoreSchema = new Schema({}, { strict: false });
const Store = model('Store', StoreSchema);
const Product = model('products', ProductSchema);
const OldProductSchema = new Schema({}, { strict: false });
const oldproduct = model('oldproduct', OldProductSchema);
const orderSchema = new Schema({}, { strict: false });

const Order = model('Order', orderSchema);

export  {Product,oldproduct,Order};
