
const apiKey = "3c7bdbd3335847c180f62644260408";
const baseUrl = "https://api.weatherapi.com/v1/forecast.json";
const searchInput = document.getElementById("searchInput");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const weatherCondition = document.getElementById("weatherCondition");
const weatherIcon = document.getElementById("weatherIcon");
const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("searchBtn");
const greeting = document.getElementById("greeting");
const greetingMessage = document.getElementById("greetingMessage");
const weatherEffects = document.getElementById("weatherEffects");
const cloudLayer = document.getElementById("cloudLayer");
const forecastCards = document.getElementById("forecastCards");
const backgroundLayer = document.getElementById("backgroundLayer");
const loadingScreen = document.getElementById("loadingScreen");
const pressure = document.getElementById("pressure");
const uvIndex = document.getElementById("uvIndex");
const feelsLike = document.getElementById("feelsLike");

const aqi = document.getElementById("aqi");
function getWeather() {

    const city = searchInput.value.trim();
loadingScreen.classList.remove("hidden");
    if (city === "") {
       searchInput.classList.add("shake");

setTimeout(function(){

searchInput.classList.remove("shake");

},350);
        return;
    }

    const url = `${baseUrl}?key=${apiKey}&q=${city}&days=7&aqi=yes&alerts=no`;
temperature.innerText = "...";

weatherCondition.innerText = "Searching...";

cityName.innerText = "";
    fetch(url)

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
        const condition = data.current.condition.text.toLowerCase();
        if(condition.includes("sun")){

    backgroundLayer.style.background =
    "linear-gradient(180deg,#4FC3F7,#81D4FA,#B3E5FC)";

}

else if(condition.includes("cloud")){

    backgroundLayer.style.background =
    "linear-gradient(180deg,#4B5563,#6B7280,#9CA3AF)";

}

else if(condition.includes("rain")){

    backgroundLayer.style.background =
    "linear-gradient(180deg,#1E293B,#334155,#475569)";

}

else{

    backgroundLayer.style.background =
    "radial-gradient(circle at top,#1E3A8A 0%,#0F172A 35%,#020617 100%)";

}
        document.body.classList.remove(
    "sunny",
    "cloudy",
    "rainy",
    "night"
);
if(condition.includes("sun")){

    document.body.classList.add("sunny");

}

else if(condition.includes("cloud")){

    document.body.classList.add("cloudy");

}

else if(condition.includes("rain")){

    document.body.classList.add("rainy");

}

else{

    document.body.classList.add("night");

}
        forecastCards.innerHTML = "";
        data.forecast.forecastday.forEach(function(day){

    console.log(day);
    const card = document.createElement("div");
    card.classList.add("forecast-card");
    const dayName = new Date(day.date).toLocaleDateString("en-US", {
    weekday: "short"
});
   card.innerHTML = `
    <h3>${dayName}</h3>

    <img src="https:${day.day.condition.icon}" alt="Weather">

    <p>${day.day.maxtemp_c}° / ${day.day.mintemp_c}°</p>
`;
 forecastCards.appendChild(card);
    });
      temperature.innerText = data.current.temp_c + "°";
        weatherCondition.innerText = data.current.condition.text;
        cityName.innerText = data.location.name;
const localTime = data.location.localtime;
const hour = Number(localTime.split(" ")[1].split(":")[0]);
if(hour >= 5 && hour < 12){

    greeting.innerText = "☀️ Good Morning";
    greetingMessage.innerText = "Have a wonderful day!";

}

else if(hour >= 12 && hour < 17){

    greeting.innerText = "🌤 Good Afternoon";
    greetingMessage.innerText = "Hope you're enjoying your day!";

}

else if(hour >= 17 && hour < 20){

    greeting.innerText = "🌇 Good Evening";
    greetingMessage.innerText = "Relax and enjoy your evening!";

}

else{

    greeting.innerText = "🌙 Good Night";
    greetingMessage.innerText = "Sleep well and stay warm!";

}
        humidity.innerText = data.current.humidity + "%";
        windSpeed.innerText = data.current.wind_kph + " km/h";
        visibility.innerText = data.current.vis_km + " km";
pressure.innerText = data.current.pressure_mb + " mb";
uvIndex.innerText = data.current.uv;
        sunrise.innerText = data.forecast.forecastday[0].astro.sunrise;
        sunset.innerText = data.forecast.forecastday[0].astro.sunset;
 feelsLike.innerText = data.current.feelslike_c + "°";
pressure.innerText = data.current.pressure_mb + " mb";
uvIndex.innerText = data.current.uv;
if(data.current.air_quality){

    const pm = data.current.air_quality.pm2_5;

    if(pm <= 12){

        aqi.innerText = "Good 🟢";

    }

    else if(pm <= 35){

        aqi.innerText = "Moderate 🟡";

    }

    else{

        aqi.innerText = "Poor 🔴";

    }

}
       console.log(data.current.condition.icon);
weatherIcon.src = "https:" + data.current.condition.icon;

weatherIcon.onerror = function(){

    console.log("Icon failed to load");

}
const hero = document.querySelector(".hero");

const body = document.body;

if(data.current.is_day === 1){

    body.classList.remove("night-mode");
    body.classList.add("day-mode");

}else{

    body.classList.remove("day-mode");
    body.classList.add("night-mode");

}
weatherEffects.innerHTML = "";

if(data.current.condition.text.includes("Rain")){

    for(let i = 0; i < 120; i++){

        const drop = document.createElement("div");

        drop.classList.add("rain-drop");

        drop.style.left = Math.random() * 100 + "vw";

        drop.style.animationDuration = (Math.random() * 1 + 0.6) + "s";

        drop.style.animationDelay = Math.random() * 2 + "s";

        weatherEffects.appendChild(drop);

    }

}
cloudLayer.innerHTML = "";

if(data.current.condition.text.includes("Cloud")){

    for(let i=0;i<6;i++){

        const cloud=document.createElement("div");

        cloud.classList.add("cloud");

        cloud.innerHTML="☁️";

        cloud.style.top=Math.random()*250+"px";

        cloud.style.animationDuration=(20+Math.random()*20)+"s";

        cloud.style.animationDelay=Math.random()*5+"s";

        cloudLayer.appendChild(cloud);

    }

}


loadingScreen.classList.add("hidden");

 
    })
    .catch(function(error){

    loadingScreen.classList.add("hidden");

    console.log(error);

});

}

searchBtn.addEventListener("click", getWeather);

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
   

});