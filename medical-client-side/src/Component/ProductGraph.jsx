// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, CategoryScale,LinearScale,PointElement,LineElement,Title, Tooltip, Legend,Filler } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement,LineElement,Title, Tooltip, Legend,Filler);

const ProductGraph = () => {
    const [year, setYear] = useState(new Date().getFullYear()); // current year
    const [chartData, setChartData] = useState(null);
    const [isShowCustomGraphDetail, setisShowCustomGraphDetail] = useState(false)
    const [yearsArrayFrom2024toCurrentYear, setyearsArrayFrom2024toCurrentYear] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() =>{  
    if (year > 2024) {
        setisShowCustomGraphDetail(true)
        const differnce = year - (2024)
        let startYear = 2024
        let arrayYear = []
        setyearsArrayFrom2024toCurrentYear([])
        for (let i = 0; i < (differnce + 1); i++) {
            arrayYear.push(parseInt(startYear++))
        }
        setyearsArrayFrom2024toCurrentYear(arrayYear)
        console.log("Option Years", arrayYear);
    }
}, []);
    useEffect(() => {
        // let chartInstance; // Declare a variable to store the chart instance
        const fetchData = async () => {

            const productgrph = Array(12).fill(0);
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/productgraph`, { year: year }).then(res => {
                // console.log("Productgraph", res.data);
                const data = res.data.productgraph
                const months = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(item => {
                        productgrph[item._id - 1] = item.count;
                    });
                    setChartData({
                        labels: months,
                        datasets: [
                            {
                                label: 'Add Product',
                                data: productgrph,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                                fill: false
                            }
                        ]
                    });
                    console.log(productgrph);
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
        };

        fetchData();
        }, [year]);
        const changeyear = (e) => {
            console.log("e.target.value",e.target.value);
            // console.log("DataYearRef.current.value", DataYearRef.current.value);
            setYear(e.target.value)
        }
    const LoadingComponent = () => (
        <div className="flex items-center justify-center min-h-[300px]">
            <div className="w-12 h-12 rounded-full bg-gray-500 animate-pulse"></div>
        </div>
    );
    if (loading) return <LoadingComponent />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            {/* <h1>Chart Graph</h1> */}
        <div className="flex flex-col a justify-around px-8 h-96 rounded-lg relative w-full " style={{background: '#1D2932'}}>
            {/* <div className="w-[500px] h-[500px] "> */}
                {chartData != null ?   
                <>
                    <div className='w-full h-72'><Line data={chartData} className='bg-blu-400' /></div>
                    <div className='flex w-full justify-center   gap-5 items-center relative'>
                    {!isShowCustomGraphDetail && 
                            <h1  className='text-2xl  font-semibold'>{year} </h1>
                    }
                            {isShowCustomGraphDetail &&
                                <select name="year" id="year" value={year}  onChange={changeyear} className='outline-none px-3 py-1 rounded-lg' style={{ background: '#2B3C46' }}>
                                    {
                                        yearsArrayFrom2024toCurrentYear.map((element) => {
                                            return (
                                                <option id={element} value={element}>{element}</option>      
                                            )
                                        })
                                    }
                                </select>
                            }
                            </div>

                </>:''
            }
      {/* </div > */}
    </div >
            </>

    // <div>
     
  );
};

export default ProductGraph;