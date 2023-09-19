// import logo from './logo.svg';
import React, { useState } from 'react';
import axios from'axios';
// import './App.css';

function App() {
const [data,setData]=useState({})
const [location,setLocation]=useState('')


//url lagega
const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4b35d6da040629b3dac2adf04982d144`

//for temperature conversion form kelvin to degree celsius
const degree =(x:float)=>{
x=x-273.15;
return(x.toFixed());
}

//for visibility conversion from meters to kms
const visible=(x)=>{
  x=x/1000;
  return x;
}


const searchLocation = (event) =>{
  if(event.key === 'Enter'){
    axios.get(url).then((response) =>{
      setData(response.data)
      console.log(response.data)

    }

    )
setLocation('')}
 }

  return (
    
    <>

    <div className="app">
      <div className="search">
        
        <input type="text" value={location} onChange={event => setLocation(event.target.value)} 
         onKeyDown={searchLocation}
        placeholder='Search Location'/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="country">
            {data.sys ? <p>{data.sys.country}</p> : null}
          </div>
          <div className="temp">
            {/* {data.main ? <h1>{data.main.temp}°F</h1> : null} */}
             {/* {data.main ? degree(data.main.temp) : null } */}
              {data.main ? <h1>{degree(data.main.temp)}°C</h1> : null } 
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            
            {/* {data.main ? <p className='bold'>{data.main.feels_like}</p> : null} */}
            {data.main ? <p className='bold'>{degree(data.main.feels_like)}°C</p> : null }
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
          <p>Humidity</p>
            
            
          </div>
          <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed}MPH</p> : null}
            
            <p>Wind Speed</p>
          </div>
          <div className="visibility">
           {data.visibility ?<p> {visible(data.visibility)}KM</p> : null} 
           <p>Visibility</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
