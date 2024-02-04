import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function Page1() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/btc-prices')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const chartData = {
                    labels: data.map(item => new Date(item.date).toLocaleDateString()),
                    datasets: [
                        {
                            label: 'BTC Price',
                            data: data.map(item => item.price),
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                };
                setData(chartData);
            })
            .catch(error => {
                setError(error.toString());
            });
    }, []);

    return (
        <div>
            <h1>BTC Prices</h1>
            {error ? (
                <div>{error}</div>
            ) : data ? (
                <Line data={data} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Page1;