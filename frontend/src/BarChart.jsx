// BarChart.js
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const BarChart = () => {
  const [data, setData] = useState(null);
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    // Fetch the CSV file
    fetch('/PeriodStats2.csv') // Adjust the path to your CSV file
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
    let processedData = processData(data);
    setPlotData(processedData);
  }, [data]);

  const processData = (data) => {
    if (!data) return null;

    const x = data.map(row => row['Time Period']);
    const y = data.map(row => row['Prior/Posterior']);

    const yPrior = data.map(row => row['Prior']);
    const yPosterior = data.map(row => row['Posterior']);

    let difference = yPosterior.map((value, index) => value - yPrior[index]);

    // Periods of burn-in
    const burnInCutoff = 5;

    return [
      {
        x: x,
        y: difference,
        type: 'bar',
        marker: {
          color: difference.map((value, index) => {
            if (index < burnInCutoff) {
              return value >= 0 ? 'rgb(104,104,104)' : 'rgb(170,170,170)'; // Gray for burn-in
            } else {
              return value >= 0 ? 'rgb(172, 65, 65)' : 'rgb(39, 82, 176)'; // Different color for the rest
            }
        })
    },
        hovertemplate: difference.map((value, index) => {
            if (index < burnInCutoff) {
                return value >= 0 ? '+%{y} Tg/yr<br>~Burn in~<extra></extra>' : '%{y} Tg/yr<br>~Burn in~<extra></extra>'
            } else {
                return value >= 0 ? '+%{y} Tg/yr<extra></extra>' : '%{y} Tg/yr<extra></extra>'
            }
        }
        ),
      },
    ];
  };

  return (
    <Plot
      data={plotData}
      layout={{
        title: '∆ Posterior/Prior by Period',
        xaxis: { tickfont: { size: 10 } },
        yaxis: { title: 'Tg/yr' },
        plot_bgcolor: '#282c34',
        paper_bgcolor: '#282c34',
        font: { color: 'white' },
      }}
    />
  );
};

export default BarChart;