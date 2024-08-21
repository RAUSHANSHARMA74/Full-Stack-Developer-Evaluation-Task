import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = mongoose.connect(process.env.MONGODB_URL, {
    dbName: 'RQ_Analytics',
});

const Customers = mongoose.connection.collection('shopifyCustomers');
const Products = mongoose.connection.collection('shopifyProducts');
const Orders = mongoose.connection.collection('shopifyOrders');

export { connection, Customers, Products, Orders };
