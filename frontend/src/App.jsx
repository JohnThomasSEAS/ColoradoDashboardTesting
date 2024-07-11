import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import DashDashboard from "./DashDashboard";
import FrontendDashboard from "./FrontendDashboard";
import BarChart from "./BarChart";
import StackedBarchart from "./StackedBarchart";
import ScaleFactorsSlider from "./ScaleFactorsSlider";
import OverallStats from "./OverallStats";

function App() {
  const [buttonText, setButtonText] = useState(
    "Show ∆ Posterior/Prior by Period"
  );

  const switchChart = () => {
    if (buttonText === "Show ∆ Posterior/Prior by Period") {
      setButtonText("Show line chart");
    } else {
      setButtonText("Show ∆ Posterior/Prior by Period");
    }
  };

  const burnInPeriods = 5;

  return (
    <div className="App">
      <div className="gridCell" style = {{position: "relative"}}>

        {buttonText === "Show ∆ Posterior/Prior by Period" ? (
          <FrontendDashboard type="Prior/Posterior" burnInCutoff = {burnInPeriods}/>
        ) : (
          <BarChart />
        )}
        <button id= "switchChartButton" onClick={() => switchChart()}>{buttonText}</button>
      </div>
      <div className="gridCell">
        <ScaleFactorsSlider burnInCutoff = {burnInPeriods} />
      </div>
      <div className="gridCell">
        <FrontendDashboard type="Bias" burnInCutoff = {burnInPeriods}/>
        </div>
      <div className="gridCell">
        <OverallStats />
      </div>
      <br />
    </div>
  );
}

export default App;
