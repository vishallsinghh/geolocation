//Elements
const tempcontainer = document.querySelector(".tempvalue");
const tempcity = document.querySelector(".city");
const tempcountry = document.querySelector(".country");
// const tempdescp = document.querySelector(".descp");
const tempicon = document.querySelector(".icon");
const tempfeel = document.querySelector(".feelslike");
const templong = document.querySelector(".long");
const templat = document.querySelector(".lat");
const close = document.querySelector(".three")
const container = document.querySelector(".container")

//Using Geolocation
x = navigator.geolocation;
x.getCurrentPosition(success, failure);

//Finding and putting it up
function success(position)
{
	var myLat = position.coords.latitude;
	var myLong = position.coords.longitude;

	var coords = new google.maps.LatLng(myLat,myLong);

	var mapOptions = {
		zoom:13,
		center: coords,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var marker = new google.maps.Marker({map:map, position:coords});
}

function failure()
{}
//App Data
const weather = {};

weather.temperature = {
	unit : "celcius"
}

//Kelvin Constant and API key
const kelvin = 273;

const key = "76b08d0791b1b13c3dae6866bef3e185"

//Check if browser supports geolocation
if('geolocation' in navigator)
{
	navigator.geolocation.getCurrentPosition(setPosition, showError)
}
else{
	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p>Location is disabled in your browser</p>`;
}

//Set user's position
function setPosition(position)
{
	let lat = position.coords.latitude;
	let long = position.coords.longitude;

	getWeather(lat, long)	
}

//Show error
function showError()
{

}

//Get weather from API
function getWeather(lat, long)
{
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

	fetch(api)
		.then(function(res)
		{
			let data = res.json()
			return data;
		})
		.then(function(data)
		{
			console.log(data)
			weather.temperature.value = Math.floor(data.main.temp - kelvin);
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;
			weather.city = data.name;
			weather.country = data.sys.country;
			weather.feelslike = Math.floor(data.main.feels_like - kelvin);
            weather.highTemp = Math.floor(data.main.temp_max - kelvin);
            weather.minTemp = Math.floor(data.main.temp_min - kelvin);
            weather.humidity = data.main.humidity;
            weather.windspeed = data.wind.speed;
            weather.long = data.coord.lon;
            weather.lat = data.coord.lat;
		})
		.then(function()
		{
			displayWeather();
		});
}
function displayWeather()
{	console.log(weather)
	tempcontainer.innerHTML = `<b>${weather.temperature.value}°C</b>`;
	tempcity.innerHTML = `${weather.city}`;
	tempcountry.innerHTML = `${weather.country}`;
	// tempdescp.innerHTML = `Description - ${weather.description}`;
	tempicon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
	tempfeel.innerHTML = `<i>feelslike <b>${weather.feelslike}°C</b></i>`
	templong.innerHTML = `Longitude:  <b>${weather.long}</b>`;
	templat.innerHTML = `Latitude:  <b>${weather.lat}</b>`;
}
// TIME FUNCTION
window.onload = function() {
  clock();  
    function clock() {
    var now = new Date();
    var TwentyFourHour = now.getHours();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mid = 'PM';
    if (min < 10) {
      min = "0" + min;
    }
    if (hour > 12) {
      hour = hour - 12;
    }    
    if(hour==0){ 
      hour=12;
    }
    if(TwentyFourHour < 12) {
       mid = 'AM';
    }     
  document.getElementById('currentTime').innerHTML =     hour+':'+min+':'+sec +' '+mid ;
    setTimeout(clock, 1000);
    }
}
close.addEventListener("click", function()
{
	container.style.opacity = "0";
	container.style.visibility = "hidden";
})
