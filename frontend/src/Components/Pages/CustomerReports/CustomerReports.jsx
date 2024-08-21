import React, { useEffect, useState } from 'react';
import './CustomerReports.css';
import apiFetch from '../../Api/Api';
import DynamicChart from '../Chart/Chart';

export default function CustomerReports() {
    const [customerReport, setCustomerReport] = useState({
        daily: { labels: [], data: [] },
        monthly: { labels: [], data: [] },
        yearly: { labels: [], data: [] },
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dailyData, monthlyData, yearlyData] = await Promise.all([
                    apiFetch('/repeat-customers?interval=daily'),
                    apiFetch('/repeat-customers?interval=monthly'),
                    apiFetch('/repeat-customers?interval=yearly'),
                ]);

                setCustomerReport({
                    daily: {
                        labels: dailyData[0].periods.map(item => item.period),
                        data: dailyData[0].periods.map(item => item.totalPurchases),
                    },
                    monthly: {
                        labels: monthlyData[0].periods.map(item => item.period),
                        data: monthlyData[0].periods.map(item => item.totalPurchases),
                    },
                    yearly: {
                        labels: yearlyData[0].periods.map(item => item.period),
                        data: yearlyData[0].periods.map(item => item.totalPurchases),
                    },
                });
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="orderChart">
            <div className="total_sales_over_time">
                <h1>Number of Repeat Customers::</h1>
                <div className="total_sales">
                    <div className="daily">
                        <label htmlFor="">Daily Customer</label>
                        <DynamicChart
                            labels={customerReport.daily.labels}
                            datasets={customerReport.daily.data}
                            chartType="bar"
                        />
                    </div>
                    <div className="monthly">
                        <label htmlFor="">Monthly Customer</label>
                        <DynamicChart
                            labels={customerReport.monthly.labels}
                            datasets={customerReport.monthly.data}
                            chartType="line"
                        />
                    </div>
                    <div className="yearly">
                        <label htmlFor="">Yearly Customer</label>
                        <DynamicChart
                            labels={customerReport.yearly.labels}
                            datasets={customerReport.yearly.data}
                            chartType="polarArea"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
