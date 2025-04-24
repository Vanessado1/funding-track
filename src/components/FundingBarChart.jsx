import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FundingBarChart = () => {
    const [fundingData, setFundingData] = useState([]);

    useEffect(() => {
        fetch('/funding.json')
            .then(response => response.json())
            .then(data => setFundingData(data));
    }, []);

    // Aggregate funding by year
    const aggregatedData = fundingData.reduce((acc, item) => {
        acc[item.year] = (acc[item.year] || 0) + item.funding;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(aggregatedData),
        datasets: [
            {
                label: 'Total Funding ($)',
                data: Object.values(aggregatedData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={chartData} options={{ responsive: true }} />;
};

export default FundingBarChart;
