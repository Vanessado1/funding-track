import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const IndustryTrendChart = () => {
    const [fundingData, setFundingData] = useState([]);

    useEffect(() => {
        fetch('/funding.json')
            .then(response => response.json())
            .then(data => setFundingData(data));
    }, []);

    // Aggregate data by industry and year
    const industryData = {};
    fundingData.forEach(({ industry, year, funding }) => {
        if (!industryData[industry]) {
            industryData[industry] = {};
        }
        industryData[industry][year] = (industryData[industry][year] || 0) + funding;
    });

    const chartData = {
        labels: [...new Set(fundingData.map(item => item.year))], // Unique years
        datasets: Object.keys(industryData).map(industry => ({
            label: industry,
            data: Object.values(industryData[industry]),
            borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color
            fill: false,
        })),
    };

    return <Line data={chartData} options={{ responsive: true }} />;
};

export default IndustryTrendChart;
