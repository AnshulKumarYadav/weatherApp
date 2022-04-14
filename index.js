
function getData(){
    event.preventDefault();
    let city = document.querySelector("#search").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80286602371db166c2195ea779e03982`;


  var image = document.querySelector("#tellimage");
  image.style.display="none";

fetch(url).then(function(res){
    return res.json();
})
.then(function(res){
    console.log("res:",res)
    appData(res);
})
.catch(function(err){
    console.log("err",err);
}) 


}


function getDataLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5881c4a70f1f474bc5289105d70aa1b5`;


    var image = document.querySelector("#tellimage");
  image.style.display="none";

    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        appData(res);
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

function appData(data){
  
    var container = document.querySelector("#container");
    let map = document.querySelector("#gmap_canvas")
    map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    container.innerHTML="";

    let cityName = document.createElement("h2");
    cityName.innerText= data.name;

    let icon = document.createElement("i")
    icon.setAttribute("class","fa-solid fa-temperature-empty");
    let tempre = document.createElement("p");
    tempre.innerText=`${Math.floor(Number(data.main.temp)-273.15)}°C`;
    var temp_Box = document.createElement("div");
    temp_Box.setAttribute("id","temp-box")
    temp_Box.append(icon,tempre);

    let humidityText = document.createElement("p");
    humidityText.innerText="Humidity";
    let humidity = document.createElement("p");
    humidity.innerText=`${data.main.humidity}%`;
    let humidityBox = document.createElement("div");
    humidityBox.append(humidityText,humidity)

    let windText = document.createElement("p");
    windText.innerText="Wind"
    let wind = document.createElement("p");
    wind.innerText=`${data.wind.speed}km/h`;
    let windBox = document.createElement("div");
    windBox.append(windText,wind)

    let visibilityText = document.createElement("p");
    visibilityText.innerText="Visibility";
    let visibility = document.createElement("p");
    visibility.innerText= `${Number(data.visibility)/1000}km`;
    let visibilityBox = document.createElement("div");
    visibilityBox.append(visibilityText,visibility)

    let pressureText = document.createElement('p')
    pressureText.innerText="Pressure";
    let pressure = document.createElement("p");
    pressure.innerText=`${data.main.pressure}mb`;
    let pressureBox = document.createElement("div");
    pressureBox.append(pressureText,pressure);


    let seaText = document.createElement("p")
    seaText.innerText="Weather"
    let sea_level = document.createElement("p");
    sea_level.innerText=data.weather[0].description;
    let seaBox = document.createElement("div");
    seaBox.append(seaText,sea_level);

    let para = document.createElement("p");
    para.innerText=`The high tempreature will be ${Math.floor(Number(data.main.feels_like)-273.15)}°C`

    let dataBox = document.createElement("div");
    dataBox.setAttribute("id","databox");
    dataBox.append(windBox,humidityBox,visibilityBox,pressureBox,seaBox);

    let div = document.createElement("div");
    div.setAttribute("id","dataDisplay");
    div.append(cityName,temp_Box,para,dataBox);

    let div2 = document.createElement("div");
    div2.append(map);

    
    container.append(div,div2);

}


document.getElementById("getLocation").addEventListener("click",getdatabyLocation);

function getdatabyLocation()
{
navigator.geolocation.getCurrentPosition(success);

function success(pos)
{
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    getDataLocation(crd.latitude,crd.longitude)
}
}

