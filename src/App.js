import React, { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment';
import myLogoGif from './img/temp.gif';
import { FaSearch } from 'react-icons/fa';
const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  const [cityWeatherData, setCityWeatherData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Bangalore");

  const handleChange = async (event) => {
    setSearchTerm(event.target.value);
    

  };

  const getCityWiseLocation = async () => {
    if (searchTerm.length >= 4) {
      const response = await fetch(
        `http://localhost:3001/getWeatherInfo/city?city=${searchTerm}`,
        {
          method: "GET",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
          })
        }
      );
      const postData = await response.json();
      setCityWeatherData(postData);
      setIsLoading(false);
      setIsSearch(true);
    } else {
      setIsLoading(false);
      setIsSearch(false);
    }
  }
  useEffect(() => {
    getCityWiseLocation()

  }, []);

  const showSearchResults = () => {
    if (isSearch) {
      return (
        <div>
          <table className="table-header">
            <thead>
              <td>City Name </td>
              <td>Country Code </td>
              <td>Current Date </td>
              <td>Current Time </td>
              <td>Current Status</td>
              <td>Temperature</td>
              <td>Pressure</td>
              <td>Humidity</td>
              <td>Cloudiness</td>
              <td>Sunrise</td>
              <td>Sunset</td>
            </thead>
            <tbody className="table-body">
              <tr>
                <td><div>{cityWeatherData?.name}</div></td>
                <td><div>{cityWeatherData?.sys?.country}</div></td>
                <td><div>{moment.unix(cityWeatherData?.dt).format("ll")}</div></td>
                <td><div>{moment.unix(cityWeatherData?.dt).format("h:mm a")}</div></td>
                <td><div>{cityWeatherData?.weather[0]?.description}</div></td>
                <td><div>{cityWeatherData?.main?.temp} Celcius</div></td>
                <td><div>{cityWeatherData?.main?.pressure} hPa</div></td>
                <td><div>{cityWeatherData?.main?.humidity}%</div></td>
                <td><div>{cityWeatherData?.clouds.all}%</div></td>
                <td><div>{moment.unix(cityWeatherData?.sys?.sunrise).format("hh:mm a")}</div></td>
                <td><div>{moment.unix(cityWeatherData?.sys?.sunset).format("hh:mm a")}</div></td>
              </tr>
            </tbody>



          </table>
        </div>
      )
    }
  }

  return (
    <div className="App">
      {isLoading && <p>Wait we're loading weather details for your location!</p>}
      <header className="App-header">
        <h3> Weather App </h3>


      </header>
      <img src={myLogoGif} className="app_logo_gif" alt="logo" />

      <div className="search">
        <input
          type="text"
          placeholder="Search by City "
          value={searchTerm}
          onChange={handleChange}
          className="outlined-input"
        />
        <button className="search-button" onClick={()=>getCityWiseLocation()}>
        <FaSearch />
      </button>
      </div>
      <div style={{ marginBottom: '30px' }}></div>
      {isSearch && showSearchResults()}
    </div>
  );
}

export default App;
