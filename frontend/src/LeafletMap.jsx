import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS

const LeafletMap = () => {
    const [geojson, setGeojson] = useState(null);

    useEffect(() => {
        fetch('/Shapefiles/ColoradoBoundary.geojson')
            .then(response => response.json())
            .then(data => {
                setGeojson(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Define the style function for GeoJSON
    const geoJsonStyle = {
        color: 'rgba(31, 119, 180, 0.6)',
        weight: 5,
        opacity: 0.95
    };

    return (
        <div style = {{marginTop: '90px'}}>

            <MapContainer center={[39, -105]} zoom={6} style={{ height: '400px', borderRadius: "10px" }}>
                <LayersControl position="topright">
                        <TileLayer
                            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
                        />
                    {geojson && (
                        <LayersControl.Overlay checked name="ROI Boundary">
                            <GeoJSON data={geojson} style={geoJsonStyle} />
                        </LayersControl.Overlay>
                    )}
                </LayersControl>
            </MapContainer>
        </div>
    );
};

export default LeafletMap;