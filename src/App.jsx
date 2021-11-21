import { useState } from "react";

const api = {
  key: "e120b00209b7f72c3f9d95f8870a96af",
  base: "http://api.openweathermap.org/data/2.5/",
};
const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((data) => data.json())
        .then((data) => {
          setWeather(data);
          setQuery("");
          console.log(data);
        });
    }
  };

  const TOdaydate = () => {
    const d = new Date();
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const Months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = Months[d.getMonth()];
    return `${day} ${date}, ${month}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "App warm"
            : "App"
          : "App"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search here..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{TOdaydate()}</div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="information">
              <div className="grid-item">
                0{new Date(weather.sys.sunrise * 1000).getHours()} :{" "}
                {new Date(weather.sys.sunrise * 1000).getMinutes()} A.M.
              </div>
              <div className="grid-item">{weather.wind.speed} mph</div>
              <div className="grid-item">
                {Math.round(weather.main.temp_max)}/
                {Math.round(weather.main.temp_min)} °C
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default App;
