

function getData(){
    event.preventDefault();
    let city = document.querySelector("#search").value;
    // console.log(city);
    if(city==""){
      alert("City name incorrect");
    }


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80286602371db166c2195ea779e03982`;



  var image = document.querySelector("#tellimage");
  image.style.display="none";

fetch(url).then(function(res){
    return res.json();
})
.then(function(res){
    console.log("res:",res)
    appData(res);
    getWeather(res);
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
        // getWeather(res);
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

    let date = new Date();
    let currentTime = document.createElement("p");
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = hours + ":"+minutes+":"+seconds;

    currentTime.innerText=time;

    let icon = document.createElement("i")
    icon.setAttribute("class","fa-solid fa-temperature-empty");
    let tempre = document.createElement("p");
    tempre.innerText=`${Math.floor(Number(data.main.temp)-273.15)}°C`;
    var temp_Box = document.createElement("div");
    temp_Box.setAttribute("id","temp-box")
   
    let day = date.getDay();

    let Todayis = document.createElement("h2");
    switch(day){
      case 0: Todayis.innerText="Sunday";
      break;
      case 1: Todayis.innerText="Monday";
      break;
      case 2: Todayis.innerText="Tuesday";
      break;
      case 3: Todayis.innerText="Wedneday";
      break;
      case 4:Todayis.innerText="Thursday";
      break;
      case 5: Todayis.innerText="Friday";
      break;
      case 6: Todayis.innerText="Saturday";
      break;
    }

    temp_Box.append(icon,tempre,Todayis);

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


    let weather = document.createElement("p")
    weather.innerText="Weather"
    let sea_level = document.createElement("p");
    sea_level.innerText=data.weather[0].description;
    let seaBox = document.createElement("div");
    seaBox.append(weather,sea_level);

    let para = document.createElement("p");
    para.innerText=`The high tempreature will be ${Math.floor(Number(data.main.feels_like)-273.15)}°C`

    let dataBox = document.createElement("div");
    dataBox.setAttribute("id","databox");
    dataBox.append(windBox,humidityBox,visibilityBox,pressureBox,seaBox);

    let div = document.createElement("div");
    div.setAttribute("id","dataDisplay");
    div.append(cityName,currentTime,temp_Box,para,dataBox);

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




async function getWeather() {
  
  try {

       let city = document.getElementById("search").value;

      let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4c720ebec900cabef71eb3e672d8d8f0&units=metric`)
      let data = await res.json()
      // console.log("data:", data)
      var res2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,current&appid=4c720ebec900cabef71eb3e672d8d8f0&units=metric`);
      var data2 = await res2.json();
      console.log("data2:", data2)

      for (var i = 1; i < data2.daily.length-1; i++) {

          let box = document.createElement("div");
        
          let dateBox = document.createElement("h2");

          const unixTime = data2.daily[i].dt;
          const date = new Date(unixTime * 1000);
          const date2 = new Date(unixTime);
          let dayforecast =date.getDay(); 
          switch(dayforecast){
            case 0: dateBox.innerText="Sunday";
            break;
            case 1: dateBox.innerText="Monday";
            break;
            case 2: dateBox.innerText="Tuesday";
            break;
            case 3: dateBox.innerText="Wedneday";
            break;
            case 4:dateBox.innerText="Thursday";
            break;
            case 5: dateBox.innerText="Friday";
            break;
            case 6: dateBox.innerText="Saturday";
            break;
          }
          // console.log(dateBox);

          let displayDate = document.createElement("p")
          displayDate.innerText=date2;

          let minTempBox = document.createElement("p");
          minTempBox.innerText = `MinTemp:${data2.daily[i].temp.min}°C`;

          let maxTempBox = document.createElement("h4");
          maxTempBox.innerText = `MaxTemp:${data2.daily[i].temp.max}°C`


          var weather = document.createElement("h4");
          weather.innerText =`Whether: ${data2.daily[i].weather[0].main}`;
         

          box.append(dateBox,date2, minTempBox, maxTempBox, weather)
          let forecast=document.getElementById("futureForecast");
          forecast.append(box);
          // forecast.innerHTML="";
         
      }




  }
  catch (err) {
      console.log(err)
  }

}

