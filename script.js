const cityelement = document.querySelector(".place")
const dateelement = document.querySelector(".date")
const tempelement = document.querySelector(".temp")
const windspeedelement = document.querySelector(".windspeed")
const humidityelement = document.querySelector(".Humidity")
const visibilityelement = document.querySelector(".visibility-distance")
const description = document.querySelector(".description-temp")

const searchbox = document.querySelector(".searchinput")
const inputelement = document.querySelector(".search")
const descriptionelement = document.querySelector(".description i") 


const Apikey = '2c46fd8619f96013bf13ee4b36ffce5f'
// const city = "Pune"

async function fetchwetherdata(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Apikey}`);
    const data = await response.json()
    console.log(data)
    // console.log(data.main.temp)
    // console.log(data.name)
    // console.log(data.wind.speed)
    // console.log(data.main.humidity)
    // console.log(data.visibility)
    checkweatherUI(data)
}
function checkweatherUI(data){
    cityelement.textContent = data.name;
    tempelement.textContent = `${Math.round(data.main.temp)}°`;
    windspeedelement.textContent = `${data.wind.speed} Km/h`;
    humidityelement.textContent = `${data.main.humidity}%`;
    visibilityelement.textContent = `${data.visibility/1000}Km`;
    description.textContent = data.weather[0].description;

    const CurrentDate = new Date();
    dateelement.textContent = CurrentDate.toDateString();

    const getweatherupdate = changeweather(data.weather[0].main)
    descriptionelement.innerHTML = ` <i class="material-icons">${getweatherupdate}</i>`


} 

searchbox.addEventListener('submit', function(e){
    e.preventDefault();
    const city = inputelement.value
    if (city !== "") {
        
        fetchwetherdata(city)
        inputelement.value = "";
    }

})

function changeweather(weathercondition){
    const mapping={
        Clear:"wb_sunny",
        Clouds:"wb_cloudy",
        Rain:"umbrella",
        Thunderstrom:"flash_on",
        Drizzle:"grain",
        Snow:"ac_unit",
        Mist:"cloud",
        Smoke:"cloud",
        Haze:"cloud",
        Fog:"cloud"

    };
    return mapping[weathercondition]
}
