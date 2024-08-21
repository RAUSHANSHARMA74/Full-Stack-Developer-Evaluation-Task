import express from "express";
import {
    shopifyCustomers,
    shopifyProducts,
    shopifyOrders,
    salesOverTime
} from "../controller/shopify.js";
import { getNewCustomersOverTime, getRepeatCustomers } from "../controller/customers.js";
const shopify = express.Router()

shopify.get("/customers", shopifyCustomers)
shopify.get("/products", shopifyProducts)
shopify.get("/orders", shopifyOrders)
shopify.get('/sales-over-time', salesOverTime);
shopify.get("/new-customers", getNewCustomersOverTime)
shopify.get("/repeat-customers", getRepeatCustomers)



export default shopify