 let data;
 let tem=document.querySelector('.temperature');
 let Humidity=document.querySelector('.humidity');
 let date=new Date();
 let search_city;
 let list;
 const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 //function call  api to get data
 async function getCityInfo() {
     search_city=document.getElementById('city').value;
     console.log('check search city...',search_city);
     let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search_city}&units=metric&appid=c73aa228bfba692462f96e89080aa39a`) 
     data = await response.json();
     list=data.list;
      console.log('check data..------->',data);
      showData();
      makeCards();
  }
// show dAta-
function showData(){
  search_city=document.getElementById('city').value;
  let country=data.city.country;
  let weather=data.list[0].weather[0].main;
  let description=data.list[0].weather[0].description;
  let dayno=date.getDay();
  let day=weekday[dayno];
  // check image function called
 let image=checkImage(weather,description)
 let temp=data.list[0].main.temp;
  let code=`<h2></h2>
      <h3>${search_city},${country}</h3>
      <h4>${day}</h4>
       <h5>${description}</h5>
       <span><h1>${image}tempearature:${temp}</h1></span>`
  tem.innerHTML=code;
  let pressure=data.list[0].main.pressure;
  let humidity=data.list[0].main.humidity;
  let wind_speed=data.list[0].wind.speed;
  let code2=`  <h4>pressur:${pressure}hPa</h4>
               <h4>humidity:${humidity}%</h4>
               <h4>wind speed:${wind_speed}m/s</h4>
       `
       Humidity.innerHTML=code2;
       //make cards
}
//function makeCards
function makeCards(){
  console.log('check data...',data);
  // let list=data.list;
  list=list.slice(0,5)
  let daysdiv=document.querySelector('.days');
  console.log('cheeck day div..>',daysdiv);
   let dayno=date.getDay();
    --dayno;
  for(i=0;i<list.length;i++){
    dayno++;
    if(dayno==7){
      dayno=0;
    }
    let day=weekday[dayno];
    //call image check function
    let  maininfo=list[i].weather[0].main;
    console.log('check main....',maininfo);
    let description=list[i].weather[0].description;
    console.log('check description....',description);
   let img=checkImage(maininfo,description);
    let card=`<div class="card" id=card-${i}">
              <h2>${day}</h2>
                 ${img}
              <p>${list[i].main.temp_min}c${list[i].main.temp_max}c</p>
              </div>`
    daysdiv.innerHTML+=card;
  }

}
  //check image function
 function checkImage(main,desc){
   if(main=='Clouds' && desc=='broken clouds'||'scattered clouds '){
    return `<img src="/images/sunandcloud.jpg" alt="">`
    
   } 
   else if(main=='Clouds' && desc=='all clouds'||'overcast clouds'){
     return ` <img src="/images/allclouds.jpg" alt="">`

   }
   else if(main=="Rain" && desc=='moderate rain'||'light rain'){
          return `<img src="/images/rain.jpg" alt="">`
    
   }
   else if(main='Clear' && desc=='clear sky'){
    return `<img src="/images/sun.jpg" alt="">`
   }
   else if(main='Snow' && desc=='light snow'||'heavy snow')
   {
      return `<img src="/images/snowfall.jpg" alt="">`
   }
   else if(main=='Thunderstorm'){
       return `<img src="/images/thenderstorm.jpg" alt="">`
   }
   else{
       return `<img src="/images/sunandcloud.jpg" alt="">`
   }
          
   }
   //Edit function
  //  function editFunc(ev){
  //    console.log('check id....',ev.target.getAttribute('id'));
  //   //  console.log('check event.....',ev);
  //   //  let id=ev.target.getAttribute('id');
  //   //  console.log('check id...',id);
  //  }
   
 





 
