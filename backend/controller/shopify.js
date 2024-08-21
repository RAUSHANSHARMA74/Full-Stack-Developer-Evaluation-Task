import { connection, Customers, Products, Orders } from "../config/connection.js";



const getTotalSalesByDay = async () => {
    const orders = await Orders.aggregate([
        {
            $addFields: {
                createdAt: { $dateFromString: { dateString: "$created_at" } }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Use the new 'createdAt' field
                totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
            }
        },
        { $sort: { "_id": 1 } }
    ]).toArray();

    return orders.map(order => ({
        period: order._id,
        totalSales: order.totalSales
    }));
};


const getTotalSalesByMonth = async () => {
    const orders = await Orders.aggregate([
        {
            $addFields: {
                createdAt: { $dateFromString: { dateString: "$created_at" } }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Use the new 'createdAt' field
                totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
            }
        },
        { $sort: { "_id": 1 } }
    ]).toArray();

    return orders.map(order => ({
        period: order._id,
        totalSales: order.totalSales
    }));
};



const getTotalSalesByQuarter = async () => {
    const orders = await Orders.aggregate([
        {
            $addFields: {
                createdAt: { $dateFromString: { dateString: "$created_at" } }
            }
        },
        {
            $group: {
                _id: {
                    $concat: [
                        { $substr: [{ $year: "$createdAt" }, 0, 4] },
                        "-Q",
                        {
                            $toString: {
                                $ceil: {
                                    $divide: [{ $month: "$createdAt" }, 3]
                                }
                            }
                        }
                    ]
                },
                totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
            }
        },
        { $sort: { "_id": 1 } }
    ]).toArray();

    return orders.map(order => ({
        period: order._id,
        totalSales: order.totalSales
    }));
};


const getTotalSalesByYear = async () => {
    const orders = await Orders.aggregate([
        {
            $addFields: {
                createdAt: { $dateFromString: { dateString: "$created_at" } }
            }
        },
        {
            $group: {
                _id: { $year: "$createdAt" },
                totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
            }
        },
        { $sort: { "_id": 1 } }
    ]).toArray();

    return orders.map(order => ({
        period: order._id.toString(),
        totalSales: order.totalSales
    }));
};


const salesOverTime = async (req, res) => {
    const { interval } = req.query; // Expecting 'daily', 'monthly', 'quarterly', or 'yearly'

    let data;
    switch (interval) {
        case 'daily':
            data = await getTotalSalesByDay();
            break;
        case 'monthly':
            data = await getTotalSalesByMonth();
            break;
        case 'quarterly':
            data = await getTotalSalesByQuarter();
            break;
        case 'yearly':
            data = await getTotalSalesByYear();
            break;
        default:
            return res.status(400).send({ error: 'Invalid interval' });
    }

    res.json(data);
}


const shopifyCustomers = async (req, res) => {
    try {
        await connection;

        const customersData = await Customers.find().toArray();
        res.status(200).json({
            customers: customersData,
        });
    } catch (error) {
        console.log('Error in fetching customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const shopifyProducts = async (req, res) => {
    try {
        await connection;

        const productsData = await Products.find().toArray();

        res.status(200).json({
            products: productsData,
        });
    } catch (error) {
        console.log('Error in fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const shopifyOrders = async (req, res) => {
    try {
        await connection;

        const ordersData = await Orders.find().toArray();

        res.status(200).json({
            orders: ordersData,
        });
    } catch (error) {
        console.log('Error in fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {
    shopifyCustomers,
    shopifyProducts,
    shopifyOrders,
    salesOverTime
};
