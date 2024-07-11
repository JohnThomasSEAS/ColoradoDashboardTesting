import React, { useState, useEffect, useRef } from 'react';
import gifshot from 'gifshot';
import './ScaleFactorsSlider.css';

const ScaleFactorsSlider = ({burnInCutoff}) => {
    const [sliderValue, setSliderValue] = useState(1);
    const [filePath, setFilePath] = useState(null);
    const [slideshowStatus, setSlideshowStatus] = useState(false);
    const [slideshowInterval, setSlideshowInterval] = useState(1);
    const intervalRef = useRef(null);
    const [plotType, setPlotType] = useState("ScaleFactors");
    const [gifUrl, setGifUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const dateChunks = [
        "2021-09-01 > 2021-09-28",
        "2021-09-29 > 2021-10-26",
        "2021-10-27 > 2021-11-23",
        "2021-11-24 > 2021-12-21",
        "2021-12-22 > 2022-01-18",
        "2022-01-19 > 2022-02-15",
        "2022-02-16 > 2022-03-15",
        "2022-03-16 > 2022-04-12",
        "2022-04-13 > 2022-05-10",
        "2022-05-11 > 2022-06-07",
        "2022-06-08 > 2022-07-05",
        "2022-07-06 > 2022-08-02",
        "2022-08-03 > 2022-08-30",
        "2022-08-31 > 2022-09-27",
        "2022-09-28 > 2022-10-25",
        "2022-10-26 > 2022-11-22",
        "2022-11-23 > 2022-12-20",
    ];

    useEffect(() => {
        setFilePath(`/${plotType}/period${sliderValue}.png`);
    }, [plotType, sliderValue]);

    useEffect(() => {
        if (slideshowStatus) {
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setSliderValue((prev) => (prev < 17 ? prev + 1 : 1));
            }, slideshowInterval * 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [slideshowStatus, slideshowInterval]);

    useEffect(() => {
        console.log(dateChunks[dateChunks.length - 1].split(' > ')[1].replace(/-/g, ""))
    }, []);

    const createGif = () => {
        setLoading(true);
        const images = dateChunks.map((_, index) => `/${plotType}/period${index + 1}.png`);
        gifshot.createGIF(
            {
                images: images,
                interval: slideshowInterval,
                gifWidth: 1100, 
                gifHeight: 800,
                numFrames: images.length, // Number of frames
                frameDuration: slideshowInterval,
                sampleInterval: 10 // Higher sample interval for better quality
            },
            (obj) => {
                if (!obj.error) {
                    const link = document.createElement('a');
                    link.href = obj.image;
                    link.download = `Colorado_${plotType}_${dateChunks[0].split(' > ')[0].replace(/-/g, "")}>${dateChunks[dateChunks.length - 1].split(' > ')[1].replace(/-/g, "")}.gif`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setLoading(false)
                }
            }
        );
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: "0 10%", position: 'relative' }}>
            <div style = {{position: 'relative'}}>
                <img src={filePath} style={{ height: 'auto', width: '500px', borderRadius: '10px', marginLeft: '20px' }} alt="" />
                {sliderValue < (burnInCutoff + 1) ? <p id="burnInTag"><span><img src="https://img.icons8.com/?size=100&id=60985&format=png&color=ffffff" className = "icon" /></span>Burn-in Period</p> : null}
            </div>

            <input type="range" min="1" max="17" value={sliderValue} className="slider" onChange={(e) => { setSliderValue(Number(e.target.value)) }} style={{ width: '92%', marginTop: '20px' }} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ marginBottom: '0px' }}>Current Period: {sliderValue} of {dateChunks.length}</h4>
                <h4 style={{ marginBottom: '0px' }}>Current Date Range: <span style={{ color: '#FF7F0E' }}>{dateChunks[sliderValue - 1]}</span></h4>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: '30px', marginTop: '10px' }}>
                <h4>Autoplay:</h4>
                {slideshowStatus ? <button id="playPauseButton" onClick={() => setSlideshowStatus(false)}><span><img src="https://img.icons8.com/?size=100&id=61012&format=png&color=ffffff" className = "icon largeIcon" alt="" /></span>Pause</button> : <button id="playPauseButton" onClick={() => setSlideshowStatus(true)}><span><img src="https://img.icons8.com/?size=100&id=59862&format=png&color=ffffff" className = "icon largeIcon" alt="" /></span>Play</button>}
                <label htmlFor="seconds">Interval (sec)</label>
                <input type="number" min={0.25} max={5} step={0.5} value={slideshowInterval} name="seconds" onChange={(e) => setSlideshowInterval(Number(e.target.value))} />
                <div className="dropdown">
                    <button className="dropbtn"><span><img src="https://img.icons8.com/?size=100&id=86349&format=png&color=ffffff" className = "icon largeIcon" alt="" /></span>Plot Type</button>
                    <div className="dropdown-content">
                        <p onClick={(e) => setPlotType('ScaleFactors')}>Scale Factors</p>
                        <p onClick={(e) => setPlotType('Prior')}>Prior</p>
                        <p onClick={(e) => setPlotType('Posterior')}>Posterior</p>
                        <p onClick={(e) => setPlotType('PriorObs')}>Prior Obs. - TROPOMI</p>
                        <p onClick={(e) => setPlotType('PosteriorObs')}>Posterior Obs. - TROPOMI</p>
                    </div>
                </div>
            </div>
            <div id = "downloadButton">
                {loading ? <div className = "loader"></div> 
                : <img src="https://img.icons8.com/?size=100&id=59783&format=png&color=000000" style = {{height: "30px", width: '30px'}} alt="downloadButton" title='Download GIF' onClick={createGif} />}
            </div>

        </div>
    );
};

export default ScaleFactorsSlider;