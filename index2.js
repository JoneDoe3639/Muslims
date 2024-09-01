// prayer section started


// api =https://api.aladhan.com/v1/timingsByCity/25-08-2024?city=Sharqia&country=egypt

const prayerscontain=document.querySelector('.prayerscontain');
const prayersecFunc=async()=>{
const  city=document.getElementById('city');
const country=document.getElementById('country');
const prayerApi=`https://api.aladhan.com/v1/timingsByCity/25-08-2024?city=${city.value || 'cairo' }&country=${country.value || 'egypt'}`;
let datetoday =document.getElementById('date');
let weekday =document.getElementById('weekday');
let hajri =document.getElementById('hajri');
let monthes =document.getElementById('monthes');

const res = await (await fetch(prayerApi)).json();
console.log(res.data.date.hijri.month.ar)

date.innerHTML= res.data.date.hijri.date
weekday.innerHTML=`<small style='color:rgba(0,255,0)'>  اليوم : </small>`    + res.data.date.hijri.weekday.ar
hajri.innerHTML=`<small style='color:rgba(0,255,0)'>  الشهر الهجري :   </small>`     + res.data.date.hijri.month.ar
monthes.innerHTML= res.data.date.readable
let arr2=[];
let now=new Date();
        let resdata=res.data.timings;
        console.log(resdata);
for (pray in resdata) {
            console.log(resdata[pray])
function convertTo12Hour(time24) {
            let [hours, minutes] = time24.split(":").map(Number);
        console.log(hours,minutes,hours % 12)

            // تحديد AM أو PM
            let period = hours >= 12 ? "PM" : "AM";
        
            // تحويل الساعات من 24 إلى 12 ساعة
            hours = hours % 12 || 12;  // إذا كانت الساعة 0، تصبح 12
        
            return `${hours}:${minutes}  ${period}`;
        }
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        let time12 = convertTo12Hour(resdata[pray]);

        arr2.push(time12);
        console.log(arr2)
        let time13 = convertTo12Hour(currentTime);
        
        console.log(time13, time12);  // 2:30 PM
        
              prayerscontain.innerHTML+= `
              <div class="prayertext">
                   <img id="imgasr"alt="">
                <p style='text-align:center' id="prayercontext">
                    <span class="prayertime">${pray}</span>
                    <span class="prayertime">${time12}</span>
                    <span id="clockdiv"></span>
                </p>
            </div>
          `          
//   let getHours=date.setHours(6);

let nextprAYEr=document.querySelectorAll('.prayertext');
let index3=0;
function ChangeBackGround (){
    index3++;
    // if (time13 < time12 ) {
    //   console.log(nextprAYEr[index3]) 
    // }
}
for (let ind = 0; ind < arr2.length; ind++) {
   console.log(arr2[ind])
   if (arr2[ind] == time12 ) {
    //alert('gctt')
  }
    ChangeBackGround();
}
let audiopl=document.querySelector('#audioPlayer1');
if (time13 < time12 ) {
    audiopl.style.display='block';
    audiopl.src='./019--1.mp3';
    localStorage.setItem('Azan',pray);
    // alert(`حان وقت صلاة ${pray}`);
}else{
    audiopl.style.display='none';
}
// prayertime

function convertTo24HourNumber(time12) {
        let [time, modifier] = time12.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
    
        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        } else if (modifier === "AM" && hours === 12) {
            hours = 0;
        }
    
        return hours + minutes / 60;
    }
 
//     let time24Number = convertTo24HourNumber(prayerNow);
//     let time24Current = convertTo24HourNumber(time13);
// console.log(time24Current);

function convertToHoursAndMinutes(decimalTime) {
        // الحصول على الساعات من الجزء الصحيح
        let hours = Math.floor(decimalTime);
    
        // تحويل الجزء العشري إلى دقائق
        let minutes = Math.round((decimalTime - hours) * 60);
    
        return { hours, minutes };
    }
    
  
    // let { hours, minutes } = convertToHoursAndMinutes(time24Number);
    // let { hours:hours1, minutes:minutes1 } = convertToHoursAndMinutes(time24Current);

    // console.log(hours,minutes);  // Prayer time
    // console.log(hours1,minutes1);  //Current Time



    
;

        }

function convertTo12Hour1(time24) {
    let [hours] = time24.split(":").map(Number);
console.log(hours,hours % 12)

    // تحديد AM أو PM
    let period = hours >= 12 ? "PM" : "AM";

    // تحويل الساعات من 24 إلى 12 ساعة
    hours = hours % 12 || 12;  // إذا كانت الساعة 0، تصبح 12

    return `${hours}`;
}
        setInterval(() => {
            let date=new Date();
            let getHours=date.getHours();
            let getmin=date.getMinutes();
            let getsec=date.getSeconds();
            getHours<10? getHours='0'+getHours:getHours;
            getmin<10? getmin='0'+getmin:getmin;
            getsec<10? getsec='0'+getsec:getsec;
            let time13 = convertTo12Hour1(`${getHours}:`);
              document.querySelector('.prayertext p #clockdiv').innerHTML=`${time13}:${getmin}:${getsec}`;
          },1000);

}
window.onload=()=>{
    prayersecFunc()
}
city.addEventListener('change',()=>{
      prayerscontain.innerHTML=''
    prayersecFunc()
})
//prayer section ended
