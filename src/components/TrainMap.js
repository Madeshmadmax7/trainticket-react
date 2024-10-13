import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './TrainMap.css';
import { GeoJSON } from 'react-leaflet';

const trainRoutes = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "name": "Chennai to Coimbatore" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [80.2707, 13.0827], 
                    [76.9647, 11.0168]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Chennai to Tirupur" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [80.2707, 13.0827], 
                    [77.3411, 11.1085] 
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Chennai to Madurai" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [80.2707, 13.0827], 
                    [78.1198, 9.9252]   
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Coimbatore to Madurai" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [76.9647, 11.0168], 
                    [78.1198, 9.9252]   
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Coimbatore to Tirupur" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [76.9647, 11.0168], 
                    [77.3411, 11.1085] 
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Madurai to Tirupur" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [78.1198, 9.9252],  
                    [77.3411, 11.1085]  
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Coimbatore to Salem" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [76.9647, 11.0168],
                    [78.1667, 11.6643]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Chennai to Nagarcoil" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [80.2707, 13.0827],
                    [77.4333, 8.0883]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Tirupur to Pondicherry" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [77.3411, 11.1085],
                    [79.8323, 11.9343]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Madurai to Vellore" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [78.1198, 9.9252],
                    [78.8375, 12.9677]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Nagarcoil to Pondicherry" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [77.4333, 8.0883],
                    [79.8323, 11.9343]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Salem to Vellore" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [78.1667, 11.6643],
                    [78.8375, 12.9677]
                ]
            }
        }
    ]
};

const stations = [
    { name: "Chennai", coordinates: [13.0827, 80.2707] },
    { name: "Coimbatore", coordinates: [11.0168, 76.9647] },
    { name: "Madurai", coordinates: [9.9252, 78.1198] },
    { name: "Tirupur", coordinates: [11.1085, 77.3411] },
    { name: "Salem", coordinates: [11.6643, 78.1667] },
    { name: "Nagarcoil", coordinates: [8.0883, 77.4333] },
    { name: "Pondicherry", coordinates: [11.9343, 79.8323] },
    { name: "Vellore", coordinates: [12.9677, 78.8375] },
];

const TrainMap = () => {
    return (
        <div className="map-container">
            <MapContainer center={[10.8505, 76.2711]} zoom={7} style={{ height: "100vh", width: "100vw" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON data={trainRoutes} style={(feature) => {
                    const colors = {
                        "Chennai to Coimbatore": 'blue',
                        "Chennai to Tirupur": 'red',
                        "Chennai to Madurai": 'green',
                        "Coimbatore to Madurai": 'orange',
                        "Coimbatore to Tirupur": 'purple',
                        "Madurai to Tirupur": 'pink',
                        "Coimbatore to Salem": 'cyan',
                        "Chennai to Nagarcoil": 'magenta',
                        "Tirupur to Pondicherry": 'brown',
                        "Madurai to Vellore": 'lime',
                        "Nagarcoil to Pondicherry": 'teal',
                        "Salem to Vellore": 'navy'
                    };
                    return { color: colors[feature.properties.name], weight: 4 };
                }} />
                {stations.map((station, idx) => (
                    <Marker
                        key={idx}
                        position={station.coordinates}
                        icon={L.divIcon({ className: 'station-marker', html: `<div>${station.name}</div>` })}
                    >
                        <Popup>{station.name} Railway Station</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default TrainMap;
