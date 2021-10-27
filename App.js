import React,{useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';

import CloudIcon from '@material-ui/icons/Cloud';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { withScriptjs, withGoogleMap, GoogleMap,Marker,InfoWindow } from "react-google-maps"

const api ={
  key: 'e8c6cba542f2d05b0006d94ed0b5549f',
  base:'http://api.openweathermap.org/data/2.5/',
}
const mapkey = 'AIzaSyA14xhKThD3uy_FfzCqO3866hpdGOE3Lbo';


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [lat , setLat] =useState('33.920265');
const [lng , setLng] = useState('35.888026');
const [country, setCountry] =useState(null);
const [names ,setNames] = useState([])
const[marklat, setMarklat] = useState('');
const[marklng, setMarklng] = useState('');

useEffect(() => {
  
   fetch('https://disease.sh/v3/covid-19/countries')
   .then(response => response.json())
   .then(data => {
     data.map((name) =>(
       names.push(name)
     ))
     
   })
   console.log(names);
}, [names])


const search = evt => {
  if (evt.key === "Enter"  || evt.Click) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setLat(result.coord.lat);
        setLng(result.coord.lon)
        setQuery('');
        console.log(result);
      });

     
   
  }
}


function Map(){
  return(
      <GoogleMap  className="map"
      defaultZoom={4}
      defaultCenter={{lat:lat , lng:lng}}
      > 
      {names.map((name) =>(
        <Marker 
        key={name.countryInfo.id}
        position={{
          lat: name.countryInfo.lat,
          lng: name.countryInfo.long
        }}
        onClick={(search) => {
         setCountry(name.country);
         setQuery(name.country);
         setMarklat(name.countryInfo.lat);
         setMarklng(name.countryInfo.long);

        
        }}
        
        icon={{
          url: `https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png`,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
        
        
        />
      ))}

    {country && (
        <InfoWindow
          onCloseClick={() => {
            setCountry(null);
          }}
          position={{
           lat:marklat,
           lng:marklng
          }}
        >
          <div>
           {weather.main.temp}
           {country}
          </div>
        </InfoWindow>
      )}
      
      </GoogleMap>
  );
}
const Wraper =withScriptjs(withGoogleMap(Map));

 
 
  


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className='app'>
      {(typeof weather.main != "undefined") ? (
      <div className='app_body'>
        {console.log(country)}
      <div className="app-right">
         {/* cards */}
         <div className="cards">
            <div className="cards_weather" >
              <h2>{weather.name}</h2>
              <p>  {weather.sys.country}</p>
              <img src={`https://raw.githubusercontent.com/lipis/flag-icon-css/d85efc9fa57f536793ab03f21e4a07a935151dea/flags/4x3/${weather.sys.country.toLowerCase()}.svg`} 
              alt="flag" width="150px" height="50px"/>
            </div>
      <div className="cards_temp">
        <h1>Weather</h1>
        <div>
        <h4> {((weather.main.temp>16) ? <WbSunnyIcon /> : <CloudIcon />)}{Math.round(weather.main.temp)} &deg;C
         &nbsp; {Math.round((weather.main.temp)*1.8+32)} &deg;F</h4>
        </div>
        <div>
      <h4>{weather.weather[0].main} <br />
        {weather.weather[0].description}
      </h4>
        </div>
        </div>

            
        </div>
         {/* <Cards /> */}
        
        
        {/* map */}
       <Wraper className="map"
         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapkey}`}
         loadingElement={<div style={{ height: `70vh` }} />}
         containerElement={<div style={{ height: `62vh` , width:`60vw`, padding:`15px`,borderRadius:`15px` }} />}
         mapElement={<div style={{ height: `100%`, borderRadius:`15px` }} />}
       />
       <div><p>{dateBuilder(new Date())}</p></div>
      </div>
      <div className="app-left">
     {/* search bar */}
     <div>
       
     <TextField className="txtfld"
     onChange={e => setQuery(e.target.value)}
     value={query}
     onKeyPress={search}
          id="outlined-textarea"
          label="Search here by city name"
          placeholder=""
          variant="outlined"
        />
     </div>

      {/* table  */}
    <table>
      <tr className="table_tr" >
        <td className="lable"> Temprature</td>
        <td>{Math.round(weather.main.temp)}&deg;C &nbsp;
        {Math.round((weather.main.temp)*1.8+32)}&deg;F
        </td>
      </tr >
      <tr className="table_tr">
        <td className="lable">Max Temprature</td>
        <td>{Math.round(weather.main.temp_max)}&deg;C &nbsp;
        {Math.round(weather.main.temp_max*1.8+32)}&deg;F
        </td>
      </tr >
      <tr className="table_tr">
        <td className="lable">Min Temprature</td>
        <td>{Math.round(weather.main.temp_min)}&deg;C &nbsp;
        {Math.round( weather.main.temp_min*1.8+32)}&deg;F</td>
      </tr >
  
      <tr className="table_tr">
        <td className="lable">Humidity</td>
        <td>{weather.main.humidity}%</td>
      </tr >
      <tr className="table_tr">
        <td className="lable">Pressure</td>
        <td>{weather.main.pressure} hPa</td>
      </tr >
    
      <tr className="table_tr">
        <td className="lable">Wind speed</td>
        <td>{weather.wind.speed} kph </td>
      </tr >
      <tr className="table_tr">
        <td className="lable"> Clouds</td>
        <td>{weather.clouds.all}</td>
      </tr >
    </table>


        
      </div>
     
      </div>
       ) : ( <TextField className="txtfld"
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
             id="outlined-textarea"
             label="Search by city name"
             placeholder=""
             // multiline
             variant="outlined"
           />)}

    </div>
  );
}

export default App;
