 let data;
 let tem=document.querySelector('.temperature');
 let Humidity=document.querySelector('.humidity');
 let date=new Date();
 let search_city;
 let list;
 const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 //show cards variables
 let country;
 let weather;
 let description;
 let temp;
 
 //function call  api to get data
 async function getCityInfo() {
     search_city=document.getElementById('city').value;
     console.log('check search city...',search_city);
     let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search_city}&units=metric&appid=c73aa228bfba692462f96e89080aa39a`) 
     data = await response.json();
     list=data.list;
     let obj=list[0]
      console.log('check data..------->',data);
      showData(obj);
      makeCards();
  }
// show dAta-
function showData(obj){
  let day;
  console.log('check obj...',obj);
  search_city=document.getElementById('city').value;
  country=data.city.country;
  weather=obj.weather[0].main;
   description=obj.weather[0].description;
   console.log('check obj...',obj.day);
  //  console.log('chek obj idde..',day in obj);
   if(obj.day!=undefined)
   {
     day=obj.day;
     console.log('check card dy..',day);
     
   }
   else{
    let dayno=new Date(obj.dt_txt).getDay();
     day=weekday[dayno];
   }

  let icon=obj.weather[0].icon
  // check image function called
 let image=checkImage(weather,description,icon)
  temp=obj.main.temp;
  let tmp_fhight=(9*temp+(32*5))/5
  tmp_fhight= parseInt(tmp_fhight, 10)
  tmp_fhight=tmp_fhight.toPrecision(2);
  let code=`<h2></h2>
      <h3>${search_city},${country}</h3>
      <h4>${day}</h4>   
       <h5>${description}</h5>
       <span><p> <img src="${image}" alt="">tempearature:${temp}&deg;<small>c</small>&nbsp;${tmp_fhight}&deg;F</p></span>`
  tem.innerHTML=code;
  let pressure=obj.main.pressure;
  let humidity=obj.main.humidity;
  let wind_speed=obj.wind.speed;
  let code2=`  <h4>pressur:${pressure}hPa</h4>
               <h4>humidity:${humidity}%</h4>
               <h4>wind speed:${wind_speed}m/s</h4>
            `
       Humidity.innerHTML=code2;
    var xValues = [100,200,300,400,500];
    var yValues = [5,8,11,2,5,];
     new Chart("myChart",{
     type:'line',
    data:{
      labels: xValues,
      dataset:[{
        backgroundColor: "rgba(0,0,0,1.0)",
        borderColor: "rgba(0,0,0,0.1)",
        data: yValues
          } ]
    },
    Option:{
      legend: {display: false},
      scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
    }
 })

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
    let  maininfo=list[i].weather[0].main;
    console.log('check main....',maininfo);
    let description=list[i].weather[0].description;
    console.log('check description....',description);
    let icon=list[i].weather[0].icon;
     //call image check function
   let img=checkImage(maininfo,description,icon);
    let card=`<div class="card" id=${i} onClick=editFunc(this)>
              <h2>${day}</h2>
              <img src="${img}" alt="">
                
              <p>${list[i].main.temp_min}&deg;<small>c</small>&nbsp;${list[i].main.temp_max}&deg;<small>c</small></p>
              </div>`
    daysdiv.innerHTML+=card;
  }

}
  //check image function
 function checkImage(main,desc,icon){
   if(main=='Clouds' && desc=='broken clouds'||'scattered clouds '){
    return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`
    
   } 
   else if(main=='Clouds' && desc=='all clouds'||'overcast clouds'){
     return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`
     
   }
   else if(main=="Rain" && desc=='moderate rain'||'light rain'){
          return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}svg`
    
   }
   else if(main='Clear' && desc=='clear sky'){
    return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`
   }
   else if(main='Snow' && desc=='light snow'||'heavy snow')
   {
      return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`
   }
   else if(main=='Thunderstorm'){
       return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`
   }
   else{
       return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/{04n}.svg`
   }
          
   }
  //  Edit function
   function editFunc(ev){

     console.log('check ev',ev);
     let id=ev.getAttribute('id')
     let getcard=list[id];
     let parent=document.getElementById(id);
     parent.style.height='';
     parent.style.border='2px solid black'
     parent.style.backgroundColor='#C0C0C0'
     let day=parent.firstElementChild.textContent;
     getcard['day']=day;
     showData(getcard);
      
    
   }

   
 





 
