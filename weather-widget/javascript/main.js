console.log("this works");

console.log("Hello, World!");

//create a ref to button
let btn = document.querySelector('.search-button')

//add event listener to the button
btn.addEventListener('click', getZipCode)

const API_KEY = config.WEATHER_API_KEY;

function getZipCode(event) {
  event.preventdefault()
  console.log("i was clicked", event)
}

  function getWeatherData() {
    // 
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=10128&APPID=${WEATHER_API_KEY}`)
  then(response => response.json())
  then(data => console.log(data));
  }
  
  getWeatherData()