import { Customers } from "../config/connection.js";

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
