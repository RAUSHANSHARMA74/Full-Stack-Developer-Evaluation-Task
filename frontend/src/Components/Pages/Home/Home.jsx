import React from 'react';
import './Home.css';
import OrderChart from '../OrderChart/OrderChart';
import Customers from '../Customers/Customers';
import CustomerReports from '../CustomerReports/CustomerReports';

export default function Home() {

    return (
        <div className="chart-container">
            <OrderChart />
            <Customers />
            <CustomerReports />
        </div>
    );
}
