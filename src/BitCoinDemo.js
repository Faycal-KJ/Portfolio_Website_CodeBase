import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Home.css';

function BitcoinPage() {
  const [priceData, setPriceData] = useState([]);
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    async function fetchBitcoinData() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=89');
        const data = await response.json();
        const formatted = data.prices.map(([timestamp, price]) => ({
          time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: parseFloat(price.toFixed(2)),
        }));   
        console.log('Fetched raw data:', data);
        console.log('Formatted priceData:', formatted);     
        setPriceData(formatted);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Bitcoin data:', err);
        setLoading(false);
      }
    }
    fetchBitcoinData();
  }, []);

  const handlePredict = async () => {
    setPredicting(true);
    try {
      const response = await fetch('https://bitcoin-ml-api.onrender.com/predict', {
        method: 'POST',
      });
      const data = await response.json();
  
      if (!data.prediction || !Array.isArray(data.prediction[0])) {
        console.error('Unexpected API response:', data);
        return;
      }
  
      const predictedPoints = data.prediction[0].map((price, index) => ({
        time: `T+${index + 1}h`,
        price: parseFloat(price.toFixed(2))
      }));
      setPrediction(predictedPoints); // optional, if you want to keep it separate
  
    } catch (err) {
      console.error('Prediction failed:', err);
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="TitanicDemoPage">
      <h1 className="TitanicDemoTitle">Bitcoin Price Forecast</h1>

      <div className="TitanicForm">
        <h2 style={{ marginBottom: '20px' }}>📊 Past 89 Days of Hourly Prices</h2>
        {loading ? <p>Loading data...</p> : (
          <ResponsiveContainer width="100%" height={400}>
          <LineChart data={priceData.slice(-300)}>
            <XAxis 
              dataKey="time"
              tickFormatter={(timeStr) => timeStr}
              minTickGap={50}
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8000ff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        )}

        <button className="PredictButton" onClick={handlePredict} disabled={predicting} style={{ marginTop: '40px' }}>
          {predicting ? 'Predicting...' : 'Predict Next 12 Hours'}
        </button>

        {prediction.length > 0 && (
          <>
            <h2 style={{ margin: '40px 0 20px' }}>🔮 Next 12-Hour Prediction</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prediction}>
                <XAxis dataKey="time" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#ff7cff" strokeWidth={2} dot={true} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
}

export default BitcoinPage;