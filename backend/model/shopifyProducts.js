const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    id: String,
    product_id: String,
    name: String,
    position: Number,
    values: [String],
});

const VariantSchema = new mongoose.Schema({
    id: String,
    product_id: String,
    title: String,
    price: Number,
    sku: { type: String, default: '' },
    position: Number,
    inventory_policy: String,
    compare_at_price: { type: String, default: null },
    fulfillment_service: String,
    inventory_management: { type: String, default: null },
    option1: String,
    option2: { type: String, default: null },
    option3: { type: String, default: null },
    created_at: { type: String, default: '' },
    updated_at: { type: String, default: '' },
    taxable: Boolean,
    barcode: { type: String, default: null },
    grams: Number,
    weight: Number,
    weight_unit: String,
    inventory_item_id: String,
    inventory_quantity: Number,
    old_inventory_quantity: Number,
    requires_shipping: Boolean,
    admin_graphql_api_id: String,
    image_id: { type: String, default: null },
});

const ProductSchema = new mongoose.Schema({
    _id: String,
    admin_graphql_api_id: String,
    body_html: { type: String, default: null },
    created_at: String,
    handle: String,
    id: String,
    image: { type: String, default: null },
    images: { type: Array, default: [] },
    options: [OptionSchema],
    product_type: String,
    published_at: { type: String, default: null },
    published_scope: String,
    status: String,
    tags: String,
    template_suffix: { type: String, default: null },
    title: String,
    updated_at: String,
    variants: [VariantSchema],
    vendor: String,
});
const ShopifyProducts = mongoose.model('Product', ProductSchema);
export default ShopifyProducts