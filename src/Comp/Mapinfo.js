import React, { useState ,useEffect } from 'react'
import Map, { Marker, NavigationControl, Popup , FlyToInterpolator , WebMercatorViewport } from 'react-map-gl'
import styles from '../CSS/map.module.css'



function Mapinfo({ weather, darklabel }) {
    
    
    
    const [showpop, setshowpop] = useState(false)
    
    
    
    
    if (weather.current != null) {
        console.log(darklabel) 
        console.log(weather.location.lat,weather.location.lon)       
    }
    
  


    
    const [myView, setmyView] = useState({
        latitude: 28.67,
        longitude: 77.2,
        width: "90vw",
        height: "85vh",
        zoom: 4,
    });




    // const onViewportChange = (viewport)=>{
    //     setmyView(viewport)

    // }
  
    


    return (
        <div>{
            typeof(weather.current!=="undefined")?
            (
        

            <Map style={{ margin: "auto", marginTop: "20px" }}   width={400}
            height={600}
            latitude={weather.location.lat}
            longitude={weather.location.lon}
            zoom={14} mapboxApiAccessToken="pk.eyJ1IjoicmFuaml0a3NoYWgiLCJhIjoiY2ticWNkanUzMmllczJybmN3NmV5NmxhbyJ9.xLeI2B_Zuvtze-APbGfctA"  onViewportChange={(viewport)=>setmyView(viewport)} mapStyle={`mapbox://styles/mapbox/${darklabel.labeltwo}`}>
                <NavigationControl />
                <Marker key={weather.location.name} latitude={weather.location.lat} longitude={weather.location.lon}>
                    <button className={styles.button} onClick={() => setshowpop(true)}   >{weather.location.name}</button>
                </Marker>

                {
                    showpop && <Popup className="popup" longitude={weather.location.lon} latitude={weather.location.lat} anchor="top" closeButton={true} onClose={() => setshowpop(false)} closeOnClick={false}>
                        <div>
                            <ul>
                                <li>
                                    feelslike : {weather.current.feelslike_c} °C
                                </li>
                                <li>
                                    wind speed : {weather.current.wind_kph} kph
                                 </li>
                                <li>
                                    wind direction : {weather.current.wind_dir}
                                </li>
                                <li>
                                    humidity : {weather.current.humidity}
                                </li>

                                <li>
                                    Pressure : {weather.current.pressure_mb} mb
                                </li>
                            </ul>
                        </div>
                    </Popup>
                }





            </Map>
            ):""
        }






        </div>
    )
}

export default Mapinfo
