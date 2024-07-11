import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const ExampleComponent = () => {
  const [figure, setFigure] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:2000/data/')
      .then(response => {
        const plotData = JSON.parse(response.data.plot_json);

        // Ensure yaxis object exists in layout
        if (!plotData.layout) {
          plotData.layout = {};
        }

        if (!plotData.layout.yaxis) {
          plotData.layout.yaxis = {};
        }

        // Log the layout before and after setting the range
        console.log('Before setting range:', plotData.layout.yaxis);

        // Set y-axis range
        // plotData.layout.yaxis.range = [0.5, 5];  // Set your desired range here

        console.log('After setting range:', plotData.layout.yaxis);

        setFigure(plotData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    figure ? (
      <Plot
        data={figure.data}
        layout={{
            ...figure.layout,
            yaxis: {
                ...figure.layout.yaxis,
                range: [0.5, 50]
            }
        }}
        frames={figure.frames}
        config={figure.config}
      />
    ) : (
      <div>Loading...</div>
    )
  );
};

export default ExampleComponent;