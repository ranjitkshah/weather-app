import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';






import './App.css';
import Mapinfo from './Comp/Mapinfo';

 
// import Data from './Comp/Data';

const api ={
  key:"7602268638114c69a4d203201202106",
  
}

function App() {
  
  const getmode = ()=>{
    return JSON.parse(localStorage.getItem("mode"))||false
  }
 
  // const url =`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [error, setError] = useState('')
  const [dark, setdark] = useState(getmode())
  const [darklabel, setdarklabel] = useState({
    labelone:"Night",
    labeltwo:"streets-v11",
  })

  
  

  useEffect(() => {
    localStorage.setItem("mode",JSON.stringify(dark))
  }, [dark])




  const handleChange = ()=>{
    if(dark===true){
      setdark(false)
      setdarklabel({
        labelone:"Night",
        labeltwo:"dark-v9"
      })

    }
    else{
      setdark(true)
      setdarklabel({
        labelone:"Day",
        labeltwo:"streets-v11"
      })

    }
  }

  const search = evt=>{
    if(evt.key==="Enter"){
      fetch(`http://api.weatherapi.com/v1/current.json?key=${api.key}&q=${query}`)
      .then(res =>
        res.json())
    .then(result => {
      evt.preventDefault()
      setWeather(result);
      setQuery('');
      console.log(result);
         
        if (result.error.code === 1006) {
            alert(`Wait! ${query}? that's a wrong city name!`)
            setWeather("");
            setQuery('');
            console.log(result);
        }
         
    }).catch(err => {
        setError(err);
        console.log("error is", err);
    })
    }
  }

  const onchange=e=>{
    setQuery(e.target.value)
  }



  const dateBuilder = d =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear() 

    return `${day} , ${date} ${month} ${year}`  
  }

  return (
    <div className={dark?"app":"dark-app"}>
      <main>
          <div className={dark?"navbar":"dark-navbar"} >
            <h1>WEATHER APP</h1>
            <FormControlLabel className="switchToggle"
        control={<Switch checked={dark} onChange={handleChange} />}
        label={darklabel.labelone}
      />
        
          </div>




      <div className="search-box" >
                <input type="text" className="search"placeholder="Search-City" onChange={onchange} onKeyPress={search} value={query} ></input>
            </div>

            { (typeof weather.current!="undefined")?(
              <div>

            <div className={dark?"location-box":"dark-location-box"} >
              <div className="location" >  {weather.location.name},{weather.location.country} </div>
              <div className="date" > {dateBuilder(new Date())} </div>
            </div>

          <div className={dark?"weather-box":"dark-weather-box"}  >
            <div className="temp" > {weather.current.temp_c}°C</div>
            <div className="weather" >   
            <img src={`http:${weather.current.condition.icon}`} alt={weather.current.condition.text} ></img>
            <label>

            {weather.current.condition.text}
            </label>
            </div>
          </div>
          <span className={dark?"map-info":"dark-map-info"} >For more info tap on location</span>
          <div className="mapdata" >

              <Mapinfo darklabel={darklabel} weather={weather} />
          </div>
              </div>
          ): ('') }
      </main>
    </div>
  );
}

export default App;



//map us

