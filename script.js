const apiKey = "8923ffc908c38c9a030bc826bc8dddde" ;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=" ;
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
let bg = document.querySelector(".body");
let cardBg = document.querySelector(".card");
let windimg = document.querySelector(".windimg");
let humidityimg = document.querySelector(".humidityimg");
const date = new Date();
let hour = date.getHours();
console.log(date , hour);
if (hour > 18 || hour<6) {
    bg.style.backgroundImage = 'url(images/night-bg.jpg)';
    bg.style.backgroundImageRepeat = 'no-repeat';
    cardBg.style.backgroundSize = 'cover' ;
    cardBg.style.backgroundImage = 'url(images/night-bg.jpg)' ;
    humidityimg.src = "images/humidity.png";
    windimg.src = "images/wind.png";
    cardBg.style.color = "white" ;
}

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block" ;     
        document.querySelector(".weather").style.display = "none" ;  
    } else{
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "images/clouds.png";
    } else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "images/clear.png";
    } else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "images/rain.png";
    } else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "images/drizzle.png";
    } else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block" ;
    document.querySelector(".error").style.display = "none" ;
}
}

    

searchButton.addEventListener("click" ,()=> {
    checkWeather(searchBox.value);
})


searchBox.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
  });