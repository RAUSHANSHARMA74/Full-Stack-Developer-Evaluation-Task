import React from 'react';
import './Home.css';
import OrderChart from '../OrderChart/OrderChart';
import Customers from '../../Customers/Customers';

export default function Home() {

    return (
        <div className="chart-container">
            <OrderChart />
            <Customers />
        </div>
    );
}
