import { Document, model, Schema } from 'mongoose';

const General_categorieSchema = new Schema(
    {

        merchant_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "User"
        },
        store_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Store"

        },
        admin_category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "admin_category"

        },
        name: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required: true,
        },

        metatag: {
            type: String,

        },
        metadescription: {
            type: String,

        },
        metakeyword: {
            type: String,
        },

        parent: {
            type: String,
        },

        parent_ids: {
            type: String,
        },

        parent_names: {
            type: String,
        },


        child: {
            type: Array,
        },

        image: {
            type: String,
            required: true,
        },
        top: {
            type: Boolean,
        },
        columns: {
            type: String,
        },
        serial: {
            type: Number,
        },
        status: {
            type: String,
        },
        seo_store: {
            type: String,
        },
        design_store: {
            type: String,
        },
        is_migrate: {
            type: Boolean,
            default : false
        },

    },
    { timestamps: true }
);

const General_categorie = model('general_categorie', General_categorieSchema);

export default General_categorie;
