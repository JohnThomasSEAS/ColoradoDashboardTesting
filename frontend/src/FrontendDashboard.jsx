import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const FrontendDash = ({type, burnInCutoff}) => {
  const [data, setData] = useState(null);
  const [plotData, setPlotData] = useState(null);
  const [chartType, setChartType] = useState(type);
  const [layout, setLayout] = useState({
    title: `${chartType} over Time`,
    yaxis: { range: [0, 2], gridwidth: 1, gridcolor: 'gray' },
    xaxis: { gridwidth: 1, gridcolor: 'gray' }
  });
  const [units, setUnits] = useState('Tg/yr');

  const handleChartTypeChange = (event) => {
    setChartType(event.target.innerHTML);
  };

  useEffect(() => {
    // Fetch the CSV file
    fetch('/PeriodStats3.csv') // Adjust the path to your CSV file
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
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data) {
      // Process the data for Plotly based on type prop
      const plotDataConverted = processData(data, chartType);
      console.log("PlotDataConverted: ", plotDataConverted);
      setPlotData(plotDataConverted);
    }
  }, [data, chartType]);

  // Process the data for Plotly
  const processData = (csvData, yData) => {
    if (!csvData) return null;

    const x = csvData.map(row => row['Time Period']);

    if (yData === 'Prior/Posterior') {
      const yPrior = csvData.map(row => row['Prior']);
      const yPosterior = csvData.map(row => row['Posterior']);

      const tracePriorFirstSegment = {
        x: x.slice(0, burnInCutoff + 1),
        y: yPrior.slice(0, burnInCutoff + 1),
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#ababab' // Color for the first segment of prior data
        },
        marker: {
          color: '#7f9baf'
        },
        hovertemplate: 'Time: %{x}<br>Prior: %{y} Tg/yr<extra></extra><br>~Burn in~',
        name: 'Prior (First Segment)',
        showlegend: false
      };

      const tracePriorSecondSegment = {
        x: x.slice(burnInCutoff),
        y: yPrior.slice(burnInCutoff),
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#1F77B4'
        },
        marker: {
          color: '#1F77B4'
        },
        hovertemplate: 'Time: %{x}<br>Prior: %{y} Tg/yr<extra></extra>',
        name: 'Prior'
      };

      const tracePosteriorFirstSegment = {
        x: x.slice(0, burnInCutoff + 1),
        y: yPosterior.slice(0, burnInCutoff + 1),
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#ababab' // Color for the first segment of prior data
        },
        marker: {
          color: '#e4a166'
        },
        hovertemplate: 'Time: %{x}<br>Prior: %{y} Tg/yr<extra></extra><br>~Burn in~',
        name: 'Posterior (First Segment)',
        showlegend: false
      };

      const tracePosteriorSecondSegment = {
        x: x.slice(burnInCutoff),
        y: yPosterior.slice(burnInCutoff),
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#FF7F0E'
        },
        marker: {
          color: '#FF7F0E'
        },
        hovertemplate: 'Time: %{x}<br>Prior: %{y} Tg/yr<extra></extra>',
        name: 'Posterior'
      };

      return [
        tracePriorFirstSegment, 
        tracePriorSecondSegment, 
        tracePosteriorFirstSegment, 
        tracePosteriorSecondSegment
      ];
    }

    else if (yData === 'DOFS') {
        setUnits('DOFS');

        const y = csvData.map(row => row['DOFS']);

        let traceBiasFirstSegment = {
            x: x.slice(0, burnInCutoff + 1),
            y: y.slice(0, burnInCutoff + 1),
            name: 'DOFS (First Segment)',
            hovertemplate: 'Time: %{x}<br>DOFS: %{y}<extra></extra><br>~Burn in~',
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: '#ababab' // Color for the first segment of prior data
            },
            marker: {
                color: '#7f9baf'
            },
            showlegend: false
        }

        let traceBiasSecondSegment = {
            x: x.slice(burnInCutoff),
            y: y.slice(burnInCutoff),
            name: 'DOFS',
            hovertemplate: 'Time: %{x}<br>DOFS: %{y}<extra></extra>',
            type: 'line',
            line: {
                color: '#1F77B4'
            },

        }


        return [traceBiasFirstSegment, traceBiasSecondSegment];
    }

    else if (yData === 'Bias') {
        setUnits('ppb')

        const biasPrior = csvData.map(row => row['BiasPrior']);
        const biasPosterior = csvData.map(row => row['BiasPosterior']);

        const traceBiasPriorFirstSegment = {
            x: x.slice(0, burnInCutoff + 1),
            y: biasPrior.slice(0, burnInCutoff + 1),
            name: 'Bias Prior (First Segment)',
            hovertemplate: 'Time: %{x}<br>Bias Prior: %{y}<extra></extra><br>~Burn in~',
            type: 'scatter',
            mode: 'lines+markers',
            line: {
            color: '#ababab' // Color for the first segment of prior data
            },
            marker: {
            color: '#7f9baf'
            },
            showlegend: false
        };
        const traceBiasPriorSecondSegment = {
            x: x.slice(burnInCutoff),
            y: biasPrior.slice(burnInCutoff),
            hovertemplate: 'Time: %{x}<br>Bias Prior: %{y}<extra></extra>',
            name: 'Bias Prior',
            type: 'line',
            line: {
                color: '#1F77B4'
            },
            legend: {showlegend: false}

        };
        const traceBiasPosteriorFirstSegment = {
            x: x.slice(0, burnInCutoff + 1),
            y: biasPosterior.slice(0, burnInCutoff + 1),
            name: 'Bias Posterior (First Segment)',
            hovertemplate: 'Time: %{x}<br>Bias Posterior: %{y}<extra></extra><br>~Burn in~',
            type: 'scatter',
            mode: 'lines+markers',
            line: {
            color: '#ababab' // Color for the first segment of prior data
            },
            marker: {
            color: '#e4a166'
            },
            showlegend: false
        };
        const traceBiasPosteriorSecondSegment = {
            x: x.slice(burnInCutoff),
            y: biasPosterior.slice(burnInCutoff),
            type: 'line',
            name: 'Bias Posterior',
            hovertemplate: 'Time: %{x}<br>Bias Posterior: %{y}<extra></extra>',
            line: {
                color: '#FF7F0E'
            }
        };

        return [
            traceBiasPriorFirstSegment,
            traceBiasPriorSecondSegment,
            traceBiasPosteriorFirstSegment,
            traceBiasPosteriorSecondSegment
        ];
        }
        
            else if (yData === 'RMSE') {
                setUnits('ppb');

                const RMSEPrior = csvData.map(row => row['RMSEPrior']);
                const RMSEPosterior = csvData.map(row => row['RMSEPosterior']);

                const traceRMSEPriorFirstSegment = {
                    x: x.slice(0, burnInCutoff + 1),
                    y: RMSEPrior.slice(0, burnInCutoff + 1),
                    name: 'RMSE Prior (First Segment)',
                    hovertemplate: 'Time: %{x}<br>RMSE Prior: %{y}<extra></extra><br>~Burn in~',
                    type: 'scatter',
                    mode: 'lines+markers',
                    line: {
                    color: '#ababab' // Color for the first segment of prior data
                    },
                    marker: {
                    color: '#7f9baf'
                    },
                    showlegend: false
                };

                const traceRMSEPriorSecondSegment = {
                    x: x.slice(burnInCutoff),
                    y: RMSEPrior.slice(burnInCutoff),
                    type: 'line',
                    name: 'RMSE Prior',
                    hovertemplate: 'Time: %{x}<br>RMSE Prior: %{y}<extra></extra>',
                    line: {
                        color: '#1F77B4'
                    },
                };

                const traceRMSEPosteriorFirstSegment = {
                    x: x.slice(0, burnInCutoff + 1),
                    y: RMSEPosterior.slice(0, burnInCutoff + 1),
                    name: 'RMSE Posterior (First Segment)',
                    hovertemplate: 'Time: %{x}<br>RMSE Posterior: %{y}<extra></extra><br>~Burn in~',
                    type: 'scatter',
                    mode: 'lines+markers',
                    line: {
                    color: '#ababab' // Color for the first segment of prior data
                    },
                    marker: {
                    color: '#e4a166'
                    },
                    showlegend: false
                };

                const traceRMSEPosteriorSecondSegment = {
                    x: x.slice(burnInCutoff),
                    y: RMSEPosterior.slice(burnInCutoff),
                    name: 'RMSE Posterior',
                    hovertemplate: 'Time: %{x}<br>RMSE Posterior: %{y}<extra></extra>',
                    type: 'line',
                    line: {
                        color: '#FF7F0E'
                    },
                };

                return [
                    traceRMSEPriorFirstSegment,
                    traceRMSEPriorSecondSegment,
                    traceRMSEPosteriorFirstSegment,
                    traceRMSEPosteriorSecondSegment
                ];
            }

    }

  useEffect(() => {
    if (!plotData) return;

    console.log("Layout use effect: ", plotData[0].y);
    const yValues = plotData.flatMap(series => series.y); // Flatten y values from all series
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    const margin = (maxY - minY) * 0.1; // Add a margin to the min and max values
    const layout = {
      title: `${chartType} over Time`,
      yaxis: { range: [minY - margin, maxY + margin], gridwidth: 1, gridcolor: 'gray', title: units },
      xaxis: { gridwidth: 1, gridcolor: 'gray' },
      legend: {
        x: 1,
        y: 1,
        xanchor: 'left',
        yanchor: 'top',
      }
    };

    setLayout(layout);
  }, [plotData, chartType]);

  return (
    <div style = {{position: 'relative'}}>
      {plotData ? (
        <Plot
          data={plotData}
          layout={{
            ...layout,
            yaxis: {size: '8', ...layout.yaxis},
            xaxis: { title: 'Date Range of KF Period', tickfont : {size: '10'}, ...layout.xaxis},
            plot_bgcolor: '#282c34',
            paper_bgcolor: '#282c34',
            font: { color: 'white'},
            legend: {
                x: 0.15, // Calculated by percentage of available space
                y: 1.1,
                xanchor: 'right',
                yanchor: 'bottom',
              }
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
      
      {/* // only show chart type dropdown if type is Bias */}
      {type === 'Bias' ? 

        <div className="dropdown biasChartDropdown">
            <button class="dropbtn">Plot Type</button>
            <div class="dropdown-content">
                <p onClick = {handleChartTypeChange}>DOFS</p>
                <p onClick = {handleChartTypeChange}>Bias</p>
                <p onClick = {handleChartTypeChange}>RMSE</p>
            </div>
        </div>
 
: ''}
    </div>
  );
};

export default FrontendDash;