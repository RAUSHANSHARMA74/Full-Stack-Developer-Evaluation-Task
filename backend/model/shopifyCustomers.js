const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    id: String,
    customer_id: String,
    first_name: String,
    last_name: String,
    company: { type: String, default: null },
    address1: String,
    address2: { type: String, default: null },
    city: String,
    province: String,
    country: String,
    zip: String,
    phone: { type: String, default: null },
    name: { type: String, default: '' },
    province_code: { type: String, default: null },
    country_code: { type: String, default: '' },
    country_name: { type: String, default: '' },
    default: { type: Boolean, default: false },
    admin_graphql_api_id: String,
    created_at: String,
    currency: { type: String, default: '' },
});

const EmailMarketingConsentSchema = new mongoose.Schema({
    state: { type: String, default: 'not_subscribed' },
    opt_in_level: { type: String, default: 'single_opt_in' },
    consent_updated_at: { type: String, default: null },
});

const CustomerSchema = new mongoose.Schema({
    _id: String,
    addresses: [AddressSchema],
    default_address: AddressSchema,
    email: String,
    email_marketing_consent: EmailMarketingConsentSchema,
    first_name: String,
    last_name: String,
    last_order_id: { type: String, default: null },
    last_order_name: { type: String, default: null },
    multipass_identifier: { type: String, default: null },
    note: { type: String, default: null },
    orders_count: { type: Number, default: 0 },
    phone: { type: String, default: null },
    sms_marketing_consent: { type: String, default: null },
    state: { type: String, default: 'disabled' },
    tags: { type: String, default: '' },
    tax_exempt: { type: Boolean, default: false },
    tax_exemptions: { type: Array, default: [] },
    total_spent: { type: String, default: '0.00' },
    updated_at: String,
    verified_email: { type: Boolean, default: true },
});

const ShopifyCustomers = mongoose.model('ShopifyCustomers', CustomerSchema);

export default ShopifyCustomers