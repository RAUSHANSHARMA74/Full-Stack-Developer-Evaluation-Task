import React, { useEffect, useState } from 'react';
import DynamicChart from '../Chart/Chart';
import './OrderChart.css';
import apiFetch from '../../Api/Api';

export default function OrderChart() {
    const [orderData, setOrderData] = useState({
        daily: { labels: [], data: [], growthRate: [] },
        monthly: { labels: [], data: [], growthRate: [] },
        quarterly: { labels: [], data: [], growthRate: [] },
        yearly: { labels: [], data: [], growthRate: [] },

    });
    console.log(orderData)

    const calculateGrowthRate = (currentSales, previousSales) => {
        if (previousSales === 0) return 0;
        return ((currentSales - previousSales) / previousSales) * 100;
    };

    const calculateGrowthRates = (salesData) => {
        return salesData.map((data, index) => {
            if (index === 0) return 0;
            return calculateGrowthRate(data.totalSales, salesData[index - 1].totalSales);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dailyData = await apiFetch("/sales-over-time?interval=daily");
                const monthlyData = await apiFetch("/sales-over-time?interval=monthly");
                const quarterlyData = await apiFetch("/sales-over-time?interval=quarterly");
                const yearlyData = await apiFetch("/sales-over-time?interval=yearly");

                setOrderData({
                    daily: {
                        labels: dailyData.map(item => item.period),
                        data: dailyData.map(item => item.totalSales),
                        growthRate: calculateGrowthRates(dailyData)
                    },
                    monthly: {
                        labels: monthlyData.map(item => item.period),
                        data: monthlyData.map(item => item.totalSales),
                        growthRate: calculateGrowthRates(monthlyData)
                    },
                    quarterly: {
                        labels: quarterlyData.map(item => item.period),
                        data: quarterlyData.map(item => item.totalSales),
                        growthRate: calculateGrowthRates(quarterlyData)
                    },
                    yearly: {
                        labels: yearlyData.map(item => item.period),
                        data: yearlyData.map(item => item.totalSales),
                        growthRate: calculateGrowthRates(yearlyData)
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
                <h1>Total Sales Over Time:</h1>
                <div className="total_sales">
                    <div className="daily">
                        <label htmlFor="">Daily Sales</label>
                        <DynamicChart labels={orderData.daily.labels} datasets={orderData.daily.data} chartType="bar" />
                    </div>
                    <div className="monthly">
                        <label htmlFor="">Monthly Sales</label>
                        <DynamicChart labels={orderData.monthly.labels} datasets={orderData.monthly.data} chartType="line" />

                    </div>
                    <div className="quarterly">
                        <label htmlFor="">Quarterly Sales</label>
                        <DynamicChart labels={orderData.quarterly.labels} datasets={orderData.quarterly.data} chartType="radar" />

                    </div>
                    <div className="yearly">
                        <label htmlFor="">Yearly Sales</label>
                        <DynamicChart labels={orderData.yearly.labels} datasets={orderData.yearly.data} chartType="polarArea" />

                    </div>
                </div>
            </div>

            <div className="sales_growth_rate_over_time">
                <h1>Sales Growth Rate Over Time:</h1>
                <div className="sales_growth">
                    <div className="daily">
                        <label htmlFor="">Daily Growth</label>
                        <DynamicChart labels={orderData.daily.labels} datasets={orderData.daily.growthRate} chartType="bar" />

                    </div>
                    <div className="monthly">
                        <label htmlFor="">Monthly Growth</label>
                        <DynamicChart labels={orderData.monthly.labels} datasets={orderData.monthly.growthRate} chartType="line" />


                    </div>
                    <div className="quarterly">
                        <label htmlFor="">Quarterly Growth</label>
                        <DynamicChart labels={orderData.quarterly.labels} datasets={orderData.quarterly.growthRate} chartType="radar" />


                    </div>
                    <div className="yearly">
                        <label htmlFor="">Yearly Growth</label>
                        <DynamicChart labels={orderData.yearly.labels} datasets={orderData.yearly.growthRate} chartType="polarArea" />


                    </div>
                </div>
            </div>
        </div>
    );
}
