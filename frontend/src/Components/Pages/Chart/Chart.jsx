import React from 'react';
import Chart from "chart.js/auto";
import { Line, Bar, Radar, PolarArea } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import "./Chart.css"
Chart.register(CategoryScale);

const PolarAreaChart = ({ data }) => {
    return (
        <PolarArea
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Users Gained between 2016-2020"
                    },
                    legend: {
                        display: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }}
        />
    );
};

const LineChart = ({ data }) => {
    return (
        <Line
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Users Gained between 2016-2020"
                    },
                    legend: {
                        display: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }}
        />
    );
};

const RadarChart = ({ data }) => {
    return (
        <Radar
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Users Gained between 2016-2020"
                    },
                    legend: {
                        display: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }}
        />
    );
};

const BarChart = ({ data }) => {
    return (
        <Bar
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Users Gained between 2016-2020"
                    },
                    legend: {
                        display: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }}
        />
    );
};

export default function DynamicChart({ labels, datasets, chartType }) {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Votes',
                data: datasets,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    };

    const chartComponents = {
        line: LineChart,
        bar: BarChart,
        radar: RadarChart,
        polarArea: PolarAreaChart
    };

    const SelectedChart = chartComponents[chartType];

    return (
        <div className="chart_container">
            <SelectedChart data={data} />
        </div>
    );
}
