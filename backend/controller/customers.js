import { Customers } from "../config/connection.js";
import { Orders } from "../config/connection.js";

export const getNewCustomersOverTime = async (req, res) => {
    const { interval } = req.query;
    let dateFormat;

    switch (interval) {
        case 'daily':
            dateFormat = '%Y-%m-%d';
            break;
        case 'monthly':
            dateFormat = '%Y-%m';
            break;
        case 'yearly':
            dateFormat = '%Y';
            break;
        default:
            return res.status(400).send('Invalid interval');
    }

    try {
        const customers = await Customers.aggregate([
            {
                $addFields: {
                    created_at: { $toDate: "$created_at" } // Ensure created_at is a Date type
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: dateFormat, date: "$created_at" } },
                    newCustomers: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]).toArray();

        const formattedData = customers.map(item => ({
            period: item._id,
            newCustomers: item.newCustomers
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching new customers:', error);
        res.status(500).send('Internal Server Error');
    }
};



export const getRepeatCustomers = async (req, res) => {
    const { interval } = req.query;
    let dateFormat;

    switch (interval) {
        case 'daily':
            dateFormat = '%Y-%m-%d';
            break;
        case 'monthly':
            dateFormat = '%Y-%m';
            break;
        case 'yearly':
            dateFormat = '%Y';
            break;
        default:
            return res.status(400).json({ error: 'Invalid interval' });
    }

    try {
        const repeatCustomers = await Orders.aggregate([
            {
                $addFields: {
                    created_at: { $dateFromString: { dateString: "$created_at", onError: new Date() } }
                }
            },
            {
                $group: {
                    _id: {
                        customerId: "$customer_id",
                        period: {
                            $dateToString: {
                                format: dateFormat,
                                date: "$created_at"
                            }
                        }
                    },
                    totalPurchases: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.customerId",
                    periods: {
                        $push: {
                            period: "$_id.period",
                            totalPurchases: "$totalPurchases"
                        }
                    },
                    total: { $sum: "$totalPurchases" }
                }
            },
            {
                $match: {
                    total: { $gt: 1 }
                }
            }
        ]).toArray();

        const data = repeatCustomers.map(customer => ({
            customerId: customer._id,
            periods: customer.periods,
            totalPurchases: customer.total
        }));

        res.json(data);

    } catch (error) {
        console.error('Error fetching repeat customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
