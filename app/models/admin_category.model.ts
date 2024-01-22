import { Document, model, Schema } from 'mongoose';

const admin_category = new Schema(
    {
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

    },
    { timestamps: true }
);

const adminCategory = model('admin_category', admin_category);

export default adminCategory;
