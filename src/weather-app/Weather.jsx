import axios from 'axios'
import React, { useState } from 'react'
import './weather.css'


function Weather() {

  const api = {
    key: "9be63ad0e2ad401fa720b70fb11d5e09",
    base: "https://api.openweathermap.org/data/2.5/"
  }



  const [value, setValue] = useState('')
  const [data, setData] = useState("")


  function handleonChange(e) {
    setValue(e.target.value)
  }


  function formSubmit(e) {
    e.preventDefault();
    axios.get(`${api.base}weather?q=${value}&units=metric&appid=${api.key}`)
      .then((result) => {
        console.log(result.data)
        setData(result.data)
      })
      .catch(error => {
        return error;
      });
  }


  let dateBuilder = (d) => {
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();

    return (
      `${day} ${date} ${month} ${year}`
    )
  }




  return (


    <div className='container'>

      <form onSubmit={formSubmit}>
        <h1>Weather App</h1>
        <input type='text'
          placeholder='Search...'
          onChange={handleonChange}>
        </input>
        <button type='submit'>Get the weather</button>
      </form>

      {
        data ? (<div className='weather'>
          <p className='city'>{data.name},{data.sys.country}  <img src={`https://flagcdn.com/60x45/${data.sys.country.toLowerCase()}.png`} alt={value} /></p>
          <p>{dateBuilder(new Date())}</p>
          <p><strong>Temp:</strong> {(Math.round(data.main.temp))}°C</p>
          <p> <strong>Humidity :</strong>{data.weather[0].main}</p>
       
        </div>) : ("")

      }









    </div>

  )
}

export default Weather