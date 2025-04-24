import FundingBarChart from './components/FundingBarChart';
import IndustryTrendChart from './components/IndustryTrendChart';

const App = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Startup Funding Tracker 💰</h1>
            <h2>Total Funding by Year</h2>
            <FundingBarChart />
            <h2>Funding Trends by Industry</h2>
            <IndustryTrendChart />
        </div>
    );
};

export default App;
