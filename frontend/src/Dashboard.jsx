import React, {useEffect, useState} from 'react';
import './Dashboard.css'
import Plot from 'react-plotly.js';



const Dashboard = () => {

    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const [plotData, setPlotData] = useState(null);

    // useEffect(() => {
    //     fetch('http://localhost:2000/data/')
    //         .then((res) => res.json())
    //         .then((data) => setData(data));
    // }, []);

    const fetchData = () => {
            fetch('http://localhost:2000/data/')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // data.plot_json.layout.yaxis.range = [3, 100]

                    console.log(data.plot_json.data)
                    setPlotData(JSON.parse(data.plot_json));
                })
                .catch(error => {
                    console.error('There was an error fetching the plot!', error);
                });
    }

    const changeYAxis = () => {
        setPlotData({
            ...plotData,
            layout: {
                ...plotData.layout,
                yaxis: {
                    ...plotData.layout.yaxis,
                    range: [0, 100]
                }
            }
        });
        console.log("Changing!")
    }

    



    return (
        <div className = "pageWrapper">
            <div className="dataContainer">
                <h2>Methane Totals</h2>
                <button onClick = {() => fetchData()}>Fetch dat data boi</button>
                <button onClick = {() => changeYAxis()}>Change dat Y boi</button>
                {data && <h3 style = {{color: 'green'}}>SUCCESS</h3>}
            </div>
            <div className="dataContainer">
                <h2>Scale Factors</h2>
                {show && 
                    <iframe src="http://localhost:2000/data/" title="Scale Factors" width="100%" height="80%"></iframe>}
            </div>
            <div className="dataContainer">
                {plotData && (
                <Plot
                data={plotData.data}
                layout={{
                    ...plotData.layout,
                    width: 600,
                    height: 350,
                    title: {
                        text: 'DOFS',
                        font: {
                            color: 'white'
                        }
                    },
                    yaxis: {...plotData.layout.yaxis, range: [0, 100]},
                    plot_bgcolor: '#282c34',
                    paper_bgcolor: '#282c34',
                    font: {
                        color: 'white'
                    },
                    xaxis: {
                        title: {
                            text: 'Time Period',
                            font: {
                                color: 'white'
                            }
                        },
                        tickfont: {
                            color: 'white'
                        },
                        gridcolor: '#444'
                    },
                    yaxis: {
                        title: {
                            text: 'Value',
                            font: {
                                color: 'white'
                            }
                        },
                        tickfont: {
                            color: 'white'
                        },
                        gridcolor: '#444',
                    },
                    legend: {
                        font: {
                            color: 'white'
                        }
                    }
                }}
                config={{ responsive: true }}
            />
            )}
            </div>
            <div className="dataContainer">
                <h2>Quick Stats</h2>
            </div>
        </div>
    );
};

export default Dashboard;