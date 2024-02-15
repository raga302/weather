import { useCallback, useEffect, useRef, useState } from 'react';
import './Content.css'
// Images
import cloud from '../images/cloud.png'
import clear from '../images/clear.png';
import rain from '../images/rain.png';
import mist from '../images/mist.png';
import snow from '../images/snow.png';
import haze from '../images/haze.png';
import smoke from '../images/smoke2.webp';
import drizzle from '../images/drizzle.png';
import error from '../images/404.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';


function Content() {

  // useState Hook
  const [input, setInput] = useState("");
  const [submitInput, setSubmitInput] = useState("jammu");
  const [temprature, setTemprature] = useState("");
  const [cityName, setCityName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [situation, setSituation] = useState("");
  const [speed, setSpeed] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [lat, setLat] = useState(32.7333);
  const [lon, setLon] = useState(74.8667);
  const [aqii, setAqi] = useState();
  const [aqiiDescription, setAqiDescription] = useState("");



  // useRef Hook
  const inputRef = useRef();


  // Search Button Function
  const SubmitHandler = (e) => {
    e.preventDefault()
    if (input === "") {
      alert("Enter City Name !")
      inputRef.current.focus();
    } else {
      setSubmitInput(input.trim());
      setInput("");
      inputRef.current.focus();
    }

  };

    // useCallback Hook !
  const getData = useCallback(async () => {
    // Try Catch !
    try {
      let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${submitInput}&appid=4f26ed3e9233596a61a59e470eb5e9a2`);
      let data = await url.json();
      let newTemp = Math.round(data.main.temp - 273.15) + '° C';
      let aqiUrl = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=4f26ed3e9233596a61a59e470eb5e9a2`)
      let aqiData = await aqiUrl.json();
      setTemprature(newTemp);
      setCityName(data.name);
      setHumidity(data.main.humidity);
      setSpeed(data.wind.speed);
      setSituation(data.weather[0].main);
  
      setLon(data.coord.lon);
      setLat(data.coord.lat);
      setAqi(aqiData.list[0].main.aqi);
      
      if (aqii == 1) {
        setAqiDescription("Good")
      }
      else if (aqii == 2) {
        setAqiDescription("Fair")
      }
      else if (aqii == 3) {
        setAqiDescription("Moderate")
      }
      else if (aqii == 4) {
        setAqiDescription("Poor")
      }
      else {
        setAqiDescription("Very Poor")
      }
      
      if (situation === 'Clouds') {
        setImgUrl(cloud);
      }
      else if (situation === 'Clear') {
        setImgUrl(clear);
      }
      else if (situation === 'Rain') {
        setImgUrl(rain);
      }
      else if (situation === 'Mist') {
        setImgUrl(mist);
      }
      else if (situation === 'Snow') {
        setImgUrl(snow);
      }
      else if (situation === 'Smoke') {
        setImgUrl(smoke);
      }
      else if (situation === 'Fog') {
        setImgUrl(smoke);
      }
      else if (situation === 'Haze') {
        setImgUrl(haze);
      }
      else if (situation === 'Drizzle') {
        setImgUrl(drizzle);
      }
      else { 
        setImgUrl(error);
      };
      
    } catch (error) {
      alert("Incorrect City Name ! ");
    };
    

  }, [submitInput, situation]);


  // useEffect Hook
  useEffect(() => {
    getData();
  }, [submitInput, getData]);

  



  return (
    <>
    <div className='container-fluid box1 d-flex justify-content-center mt-3'>
      <div className='container d-flex justify-content-center'>
      <div className=' mt-4 col-xxl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12 d-flex justify-content-center'>
        <input type='text' ref={inputRef} placeholder='Enter City Name' value={input} onChange={(e) => setInput(e.target.value)} className='inputBox' />
        <button type='submit' className='submitBtn' onClick={SubmitHandler}>Search</button>
      </div>
      </div>
    </div>
      


      <div className='box2 col-xxl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12 mt-4'>
        <div className='firstDiv col-xxl-3 col-lg-3 col-md-3 col-sm-3 col-12 col-xs-12  '>
          <p className=' para text-center'>{cityName}</p>
          <p className=' para text-center'>{temprature}</p>
        </div>

        <div className='secondDiv text-center col-xxl-3 col-lg-3 col-md-3 col-sm-3 col-8 col-xs-8 '>
          <img src={imgUrl} alt={situation} className='img-fluid' />

          <div className='aqiText'>A Q I :- {aqii}
            <br />
            <div className=''>{aqiiDescription}</div>
          </div>

        </div>


        <div className='thirdDiv col-xxl-3 col-lg-3 col-md-3 col-sm-3 col-12 col-xs-12 '>
          <div className=' para2 text-center'>Situation <br /> {situation}</div>
          <div className=' para2 text-center'>Humidity <br /> {humidity}</div>
          <div className=' para2 text-center'>Speed <FontAwesomeIcon icon={faWind} /> <br />{speed} KM/H</div>
        </div>
      </div>
    </>
  )
};

export default Content;