// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);



function SalesBuyGraph() {
    const [year, setYear] = useState(new Date().getFullYear()); // current year
    const [month, setMonth] = useState(new Date().getMonth() + 1) //  current Month
    const [isShowCustomGraphDetail, setisShowCustomGraphDetail] = useState(false)
    const [yearsArrayFrom2024toCurrentYear, setyearsArrayFrom2024toCurrentYear] = useState([])
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
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
            // console.log("Option Years", arrayYear);
        }
    }, []);
    useEffect(() => {
        // console.log("currentyear",currentyear);
        // let chartInstance; // Declare a variable to store the chart instance
        const fetchData = async () => {
            // console.log("year",  (year),"Month",month);
            const DATABUY = Array(monthDays[month-1]).fill(0);
            const DATASALE = Array(monthDays[month-1]).fill(0);
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/totalsale`, { year: parseInt(year),month:parseInt(month) }).then(res => {
                // console.log("Productgraph", res.data);
                const dataBUY = res.data.BUY
                const dataSALE = res.data.SALE
                // console.log(dataBUY, dataSALE);

                if (Array.isArray(dataBUY) && Array.isArray(dataSALE)) {
                    dataBUY.forEach(item => {
                        DATABUY[item._id - 1] = item.buy;
                    });
                    dataSALE.forEach(item => {
                        DATASALE[item._id - 1] = item.sales;
                    });
                    // console.log(DATABUY, DATASALE);
                    const newArray = [];
                    for (let i = 1; i <= monthDays[month-1]; i++) {
                      newArray.push(i);
                    }
                    setChartData({
                        labels: newArray,
                        datasets: [
                            {
                                label: 'Sales',
                                data: DATASALE,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                                fill: false
                            },
                            {
                                label: 'Buy',
                                data: DATABUY,
                                borderColor: 'rgba(153, 102, 255, 1)',
                                borderWidth: 1,
                                fill: false
                            }

                        ]
                    });
                } else {
                    console.error('Unexpected data format:', dataBUY, dataSALE);
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
    }, [year, month]);
    const changeyear = (e) => {
        // console.log("e.target.value",e.target.value);
        // console.log("DataYearRef.current.value", DataYearRef.current.value);
        setYear(e.target.value)
    }
    const changeMonth=(e)=>{
        // console.log("e.target.value",e.target.value);
        setMonth(e.target.value)
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
            <div className="flex items-center justify-around p-2 h-72 rounded-lg relative w-full " style={{ background: '#1D2932' }}>
                {/* <div className="w-[500px] h-[500px] "> */}
                {chartData != null ?
                    <>
                        <Line data={chartData} />
                        <div className='flex flex-col gap-5 items-center relative'>
                           
                            <h1  className='text-2xl mb-10 font-semibold'>{months[month-1]}-{year} </h1>

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
                            <select name="month" id="month" value={month}   onChange={changeMonth} className='outline-none px-3 py-1 rounded-lg' style={{ background: '#2B3C46' }}>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                    </> : ''
                }
            </div >
        </>


    );
};

export default SalesBuyGraph