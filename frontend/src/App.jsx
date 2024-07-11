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
import LeafletMap from "./LeafletMap";

function App() {
  const [buttonText, setButtonText] = useState(
    "Show ∆ Posterior/Prior by Period"
  );
  const [switchToMap, setSwitchToMap] = useState(false);

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
      <div className="gridCell" style = {{position: "relative"}}>
        {switchToMap ? 
          <button id="switchChartButton" onClick={() => setSwitchToMap(!switchToMap)} style = {{transform: "scale(1.2)"}}>
          <span><img src="https://img.icons8.com/?size=100&id=84389&format=png&color=ffffff" className = "icon" alt="" /></span>{switchToMap ? "Show Overall Stats" : "Show Map"}
        </button>
        : 
        <button id="switchChartButton" onClick={() => setSwitchToMap(!switchToMap)} style = {{transform: "scale(1.2)"}}>
        <span><img src="https://img.icons8.com/?size=100&id=59833&format=png&color=ffffff" className = "icon" alt="" /></span>{switchToMap ? "Show Overall Stats" : "Show Map"}
      </button>
        }
        
        {switchToMap ? <LeafletMap /> : <OverallStats />}
      </div>
      <br />
    </div>
  );
}

export default App;
