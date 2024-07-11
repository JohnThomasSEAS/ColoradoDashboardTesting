import React from 'react';
import Plot from 'react-plotly.js';

const FrontendDash = () => {
  const data = [
    { category: 'Reservoirs', value: 0.035767019617106904 },
    { category: 'Soil Absorb', value: -0.06247052933589436 },
    { category: 'Termites', value: 0.05580156154738707 },
    { category: 'Lakes', value: 0.0 },
    { category: 'Seeps', value: 0.08200292752844031 },
    { category: 'Wetlands', value: 0.017785544752455126 },
    { category: 'Biomass Burn', value: 0.00025442900172136754 },
    { category: 'Other Anth', value: 0.028835501475982895 },
    { category: 'Rice', value: 0.0 },
    { category: 'Wastewater', value: 0.016790402459472904 },
    { category: 'Landfills', value: 0.15283245168049242 },
    { category: 'Livestock', value: 0.6037419656721965 },
    { category: 'Coal', value: 0.05918332545251224 },
    { category: 'Gas', value: 1.3060967906341299 },
    { category: 'Oil', value: 0.17414438681314112 }
  ];

  const naturalSources = [
    { category: 'Reservoirs', value: 0.035767019617106904 },
    { category: 'Soil Absorb', value: -0.06247052933589436 },
    { category: 'Termites', value: 0.05580156154738707 },
    { category: 'Lakes', value: 0.0 },
    { category: 'Seeps', value: 0.08200292752844031 },
    { category: 'Wetlands', value: 0.017785544752455126 }
  ];

  const anthropogenicSources = [
    { category: 'Biomass Burn', value: 0.00025442900172136754 },
    { category: 'Other Anth', value: 0.028835501475982895 },
    { category: 'Rice', value: 0.0 },
    { category: 'Wastewater', value: 0.016790402459472904 },
    { category: 'Landfills', value: 0.15283245168049242 },
    { category: 'Livestock', value: 0.6037419656721965 },
    { category: 'Coal', value: 0.05918332545251224 },
    { category: 'Gas', value: 1.3060967906341299 },
    { category: 'Oil', value: 0.17414438681314112 }
  ];

  const categories = naturalSources.map(item => item.category).concat(anthropogenicSources.map(item => item.category));

  const naturalValues = naturalSources.map(item => item.value);
  const anthropogenicValues = anthropogenicSources.map(item => item.value);

  return (
    <Plot
      data={[
        {
          x: categories,
          y: naturalValues,
          type: 'bar',
          name: 'Natural Sources'
        },
        {
          x: categories,
          y: anthropogenicValues,
          type: 'bar',
          name: 'Anthropogenic Sources'
        }
      ]}
      layout={{
        barmode: 'stack',
        title: 'Stacked Bar Chart of Methane Emissions',
        xaxis: { title: 'Sources' },
        yaxis: { title: 'Emissions (Tg/yr)' },
        legend: {
          x: 1,
          y: 1,
          xanchor: 'right',
          yanchor: 'top',
        }
      }}
    />
  );
};

export default FrontendDash;