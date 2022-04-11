var timer;
var militimer;
let count=0;
let s=0;
let h=0;
let m=0;
let ms=0;
let i=-1;
const tablearr=[];
const divtable=document.querySelector('.table')
let clock = document.getElementById('clock');
let startbtn;
let resetbtn=document.getElementById('reset-btn');
let pause=document.getElementById('pause');
startbtn=document.getElementById('start');
let split=document.getElementById('split-btn');
let hh;
let ss;
let mm;

 startbtn.addEventListener('click',()=>{
     startbtn.style.display='none'
     pause.style.display='inline';
     split.disabled=false;
     timer = setInterval(()=>{  
        ++s;
        if(s==60){
           s=0;
           m++
       }
       if(m==60){   
           m=0;
           h++
       }
       if(h==60){
           h=0;
       }
       ss = chekTime(s);
       mm = chekTime(m);
       hh = chekTime(h);

       clock.textContent = `${hh}:${mm}:${ss}:${ms}`

    }, 1000);
      militimer=setInterval(()=>{
        ms++
        ss = chekTime(s);
        mm = chekTime(m);
        hh = chekTime(h);
        if(ms==1000){
            ms=0;
        }

       clock.textContent = `${hh}:${mm}:${ss}:${ms}`

   },0.001)

});
//pause button function
function pauseBtn(){
    clearInterval(militimer);
    clearInterval(timer);
    // timer=0;
    pause.style.display='none';   
    startbtn.style.display='inline';
    resetbtn.disabled=false;
    split.disabled=true;
    //add time 
    makeTable({interval:`${h}:${m}:${s}:${ms}`,flag:"pause",})
}
// reset button
function  reset(){
    console.log('function called');
    clearInterval(timer);
    ms=0;
    s=0;
    m=0;
    h=0;
    clock.textContent = `0${h}:${m}:${s}:${ms}`
}

function Split(){
    let h3=document.querySelector(".heading");
    h3.style.display='none';
    h3.textContent= `${hh}:${mm}:${ss}:${ms}`
    h3.style.display='block'
    let table=document.getElementById('collection');
    makeTable({interval:`${h}:${m}:${s}:${ms}`,flag:"split"})
       
}
//check time function
function chekTime(i) {
    if (i < 10) { 
        i = '0' + i}
    return i
}
//function make table
function makeTable(obj){
    i++;
    let table=document.getElementById('collection');
        var trow=document.createElement('tr');
        const td1=document.createElement('td');
        td1.innerHTML='#'+i;
        const td2=document.createElement('td');
        if(obj.flag=='pause'){
            td2.style.color='#f542a4'
        }
        else{
          td2.style.color='#f5bf42'
        }
        td2.innerHTML=obj.interval;
        const td3=document.createElement('td')
        td3.innerHTML=obj.flag;
        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        table.appendChild(trow);
   
}
