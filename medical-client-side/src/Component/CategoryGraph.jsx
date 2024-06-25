// src/components/PolarAreaChart.js
import React, { useState, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

const PolarAreaChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/categorygraph`)
      .then(response => {
        const apiData = response.data.cateorygraph;
        console.log('Fetched data:', apiData);
        if (Array.isArray(apiData) && apiData.length > 0) {
          const chartData = {
            labels: apiData.map(item => item._id),
            datasets: [{
              data: apiData.map(item => item.count),
              backgroundColor:[
                'rgba(255, 99, 132, .51)',
                'rgba(54, 162, 235, .51)',
                'rgba(255, 206, 86, .51)',
                'rgba(75, 192, 192, .51)',
                'rgba(153, 102, 255, .51)',
                'rgba(255, 159, 64, .51)'
              ]
            }]
          };
          setData(chartData);
        } else {
          console.error('Unexpected data format:', data);
          setError('Unexpected data format');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);
 

  const LoadingComponent = () => (
    <div className="flex items-center justify-center w-80 h-80">
      <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
    </div>
  );

  if (loading) return <LoadingComponent />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" relative rounded-2xl p-2 min-w-88 min-h-88" style={{background: '#1D2932'}} >
      {data ? (
        <PolarArea className=' drop-shadow-md'  data={data}/>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default PolarAreaChart;
