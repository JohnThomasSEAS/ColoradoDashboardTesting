import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Papa from 'papaparse';

const OverallStats = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch the CSV file
        fetch('/OverallStats.csv') // Adjust the path to your CSV file
            .then(response => response.text())
            .then(csvString => {
                // Parse the CSV data
                Papa.parse(csvString, {
                    header: true,
                    dynamicTyping: true,
                    complete: (result) => {
                        setData(result.data);
                    }
                });
            })
            .catch(error => console.error('Error fetching data'))

    }, []);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);



    return (
        <div>
            {data ? (
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "60%", marginLeft: "20%", paddingTop: '8%'}}>
                    <h2>Overall Stats</h2>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "50px" }}>
                        <h3>Total Prior</h3>
                        <p style={{ color: "#FF7F0E" }}>{data[4]['Value']} Tg/yr</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "50px" }}>
                        <h3>Total Observations</h3>
                        <p style={{ color: "#FF7F0E" }}>{data[1]['Value']}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "50px" }}>
                        <h3>Est. Cost: On Demand</h3>
                        <p style={{ color: "#FF7F0E" }}>${data[2]['Value']}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "50px" }}>
                        <h3>Est. Cost: Spot</h3>
                        <p style={{ color: "#FF7F0E" }}>${data[3]['Value']}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "50px" }}>
                        <h3>DOFS per Period</h3>
                        <p style={{ color: "#FF7F0E" }}>{data[0]['Value']}</p>
                    </div>
                </div>
            ) : "Loading..."}
        </div>
    );
};



export default OverallStats;