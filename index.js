const openWeatherApiKey = `3a71eb024cf24f06df25b7e4c26b91c4`;

const form = document.getElementById("interface");

form.addEventListener("submit" ,async (event) => {
    event.preventDefault();

    const cityName = document.getElementById("cityName").value;

   const cityData = await fetchCityInfo(cityName);
   const weatherData =await getWeatherData(cityName);

//    console.log(cityData);
//    console.log(weatherData);

   displayAllData(cityData,weatherData)

})


async function getWeatherData(cityName) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}`);
    const data = await response.json();
    return data;
}


async function fetchCityInfo(city) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${city}&exintro=true&explaintext=true&origin=*`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
  
      const pageId = Object.keys(data.query.pages)[0]; 
      const extract = data.query.pages[pageId]?.extract;
  
      if (extract) {
        return extract;
      } else {
        console.log("No information found for this city.");
        const cityInfo = document.getElementById("cityInfo");
        cityInfo.textContent = "No information found for this city.";
      }
    } catch (error) {
      console.error("Error fetching city information:", error.message);
    }
  }


  function displayAllData(cityData , weatherData){
    displayCityData(cityData);
    displayCityDetails(weatherData);
    displayWeatherData(weatherData);
  }

  function displayCityData(cityData){
    const cityInfo = document.getElementById("cityInfo");
    cityInfo.textContent =  cityData;
  }

    function displayCityDetails(weatherData){
        const cityNameDisplay = document.getElementById("cityNameDisplay");
        cityNameDisplay.textContent = `City Name :- ${weatherData.name}` ;

        const countryName = document.getElementById("countryName");
        countryName.textContent = `Country Name :- ${ weatherData.sys.country}`;
    }

  function displayWeatherData(weatherData){

        const temperature = document.getElementById("temperature");
        const humidity = document.getElementById("humidity");
        const pressure = document.getElementById("pressure");
        const seaLevel = document.getElementById("seaLevel");
        const visibility = document.getElementById("visibility");
        const windSpeed = document.getElementById("windSpeed");
        const lattitude = document.getElementById("lattitude");
        const longitude = document.getElementById("longitude");

        temperature.textContent = `Temperature : ${weatherData.main.temp}`;
        humidity.textContent = `Humidity : ${weatherData.main.humidity}`;
        pressure.textContent = `Pressure : ${weatherData.main.pressure}` ;
        seaLevel.textContent = `SeaLevel : ${weatherData.main.sea_level}` ;
        visibility.textContent =  `Visibility : ${weatherData.visibility}`  ;
        windSpeed.textContent =`WindSpeed : ${weatherData.wind.speed}` ;
        lattitude.textContent =`Lattitude : ${weatherData.coord.lat}` ;
        longitude.textContent =`Longitude : ${weatherData.coord.lon}` ;
  }