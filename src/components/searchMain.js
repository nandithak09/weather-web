import React,{useEffect,useState} from 'react';
import "../components/style.css";
import WeatherDetails from './WeatherDetails.js';
 
function SearchMain(){
    const[searchTerm,setSearchTerm]= useState("Mumbai");
    const [tempInfo,setTempInfo]=useState({});

    //useeffect Hook
    //Async functions
    //Promises
    //try and catch

   const getWeatherInfo= async ()=>{
    try{
        let url= `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=eaf97e5125685366222ee1344730239d`

        let res= await fetch(url);
        let data= await res.json();
       // console.log(data);
       const{temp,humidity,pressure}=data.main;
       const{main: weatherType}=data.weather[0];
       const{name}=data;
       const{speed}=data.wind;
       const{country,sunset}=data.sys;

       const myNewWeatherInfo={
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset
       };

       setTempInfo(myNewWeatherInfo);
    }catch(error){
        console.log(error);
    }

   }
   useEffect( ()=>{
    getWeatherInfo()
   },[])

    return(
        <>
        <div className="wrap">
        <div className="search">
        <input 
        type="search"
         placeholder="Search city.." 
         id="search"
         value={searchTerm}
         onChange={(e)=>setSearchTerm(e.target.value)}/>

        <button className="searchButton"onClick={getWeatherInfo}>Search</button>
        </div>
        </div>
        {/*This is the weather WeatherDetails*/}
         
         <WeatherDetails {...tempInfo} />
        </>
    );
}
export default SearchMain;