import React, {Component} from "react";
import { MapContainer, GeoJSON, TileLayer, useMap, Marker, Popup} from "react-leaflet";
// import mapData from "./../data/countries.json";
import mapData from "./../data/districts.json";
import "leaflet/dist/leaflet.css";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import "./MyMap.css"
// import { click } from "@testing-library/user-event/dist/click";
class MyMap extends Component{
    state = {color: "#ffff00"};

    color = ["green", "blue", "yellow", "orange", "gray", "red", "purple", "violet"]

    componentDidMount(){
        console.log(mapData);
    }
    countryStyle = {
        fillColor: 'red',
        fillOpacity: 1,//0-1
        color: 'black',
        weight: 0.1,
        //dashArray: 5,
    };
    onCountryClick = (event)=>{
        console.log("Clicked");
    };
    onCountryMouseover = (event)=>{
        event.target.setStyle({
            color: "green",
            fillColor: "yellow",
                // fillOpacity: 0.5,
        });
    };
    // Function
    printMessageToConsole = (event)=>{
        console.log("Clicked");
    };
    changeCountryColor = (event)=>{
        event.target.setStyle({
            color: "black",
            fillColor: this.state.color,
            fillOpacity: 0.1,
        });
    };
    onEachCountry = (country, layer)=>{
        const countryName = country.properties.amp_en;
        console.log(countryName);
        layer.bindPopup(countryName);

        // layer.options.fillOpacity = Math.random();//random opacity
        layer.options.fillOpacity = 0.1
        // const colorIndex = Math.floor(Math.random() * this.color.length)
        // layer.options.fillColor = this.color[colorIndex];
        layer.on({
            click: this.changeCountryColor,
            // click: this.printMessageToConsole,
            // mouseover: this.changeCountryColor,
        });
    }
    colorChange = (event)=>{
        this.setState({color: event.target.value});
    };
    
    render(){
        const position = [51.505, -0.09]
        return (
        <div>
            <h1 style={{textAlign: "center"}}>MyMap</h1>
            <MapContainer style={{height:"400px"}} zoom={9} center={[15, 100]}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
                <GeoJSON style={this.countryStyle} data={mapData.features} onEachFeature={this.onEachCountry}/>
            </MapContainer>
            <input type="color" value={this.state.color} onChange={this.colorChange}/>
        </div>
        );
    }
}
export default MyMap;