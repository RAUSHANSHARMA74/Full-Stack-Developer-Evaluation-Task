import React, { useEffect, useState } from 'react'
import "./Customers.css";
import apiFetch from '../Api/Api';
import DynamicChart from '../Pages/Chart/Chart';

export default function Customers() {
    const [orderData, setOrderData] = useState({
        daily: { labels: [], data: [], growthRate: [] },
        monthly: { labels: [], data: [], growthRate: [] },
        yearly: { labels: [], data: [], growthRate: [] },

    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dailyData = await apiFetch("/new-customers?interval=daily");
                const monthlyData = await apiFetch("/new-customers?interval=monthly");
                const yearlyData = await apiFetch("/new-customers?interval=yearly");

                setOrderData({
                    daily: {
                        labels: dailyData.map(item => item.period),
                        data: dailyData.map(item => item.newCustomers),
                    },
                    monthly: {
                        labels: monthlyData.map(item => item.period),
                        data: monthlyData.map(item => item.newCustomers),
                    },
                    yearly: {
                        labels: yearlyData.map(item => item.period),
                        data: yearlyData.map(item => item.newCustomers),
                    }
                });
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="orderChart">
            <div className="total_sales_over_time">
                <h1>New Customers Added Over Time:</h1>
                <div className="total_sales">
                    <div className="daily">
                        <label htmlFor="">Daily Customer</label>
                        <DynamicChart labels={orderData.daily.labels} datasets={orderData.daily.data} chartType="bar" />
                    </div>
                    <div className="monthly">
                        <label htmlFor="">Monthly Customer</label>
                        <DynamicChart labels={orderData.monthly.labels} datasets={orderData.monthly.data} chartType="line" />

                    </div>
                    <div className="yearly">
                        <label htmlFor="">Yearly Customer</label>
                        <DynamicChart labels={orderData.yearly.labels} datasets={orderData.yearly.data} chartType="polarArea" />

                    </div>
                </div>
            </div>
        </div>
    );
}
