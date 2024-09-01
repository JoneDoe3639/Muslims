const Apibase=" https://mp3quran.net/api/v3";
const RecitersEnd  ="reciters";
const lan ='ar';

const Getreciters=async ()=>{
    const res = await (await fetch(`https://mp3quran.net/api/v3/reciters`)).json();
    console.log(res);
    const choosereciters=document.getElementById('choosereciters');
    choosereciters.innerHTML+=`<option value=" "> اختر قارئ </option>`;
    res.reciters.forEach((re, ind) => {
      choosereciters.innerHTML+=`<option value="${re.id}">${re.name}</option>`;
    })
       choosereciters.addEventListener('change',(e)=>{
          e.preventDefault();
          console.log(e.target.value);
          GetMoshaf(e.target.value);
       })
      }
Getreciters();
const GetMoshaf=async(reciters_id)=>{
    const choosemoshaf=document.getElementById('choosemoshaf');
    const res = await ((await fetch(`${Apibase}/${RecitersEnd}?language=${lan}&reciter=${reciters_id}`)).json());
    console.log(res.reciters[0].moshaf);
    const Moshaf =res.reciters[0].moshaf;
    choosemoshaf.innerHTML=`<option value=" ">اختر المصحف</option>`
    Moshaf.forEach((element,ind) => {
        // console.log(element);
        choosemoshaf.innerHTML+=`<option value="${element.id}"data-server="${element.server}"data-surahList="${element.surah_list}">${element.name}</option>`
       
       
    });
    choosemoshaf.addEventListener('change',e=>{
        const SelectedOptionsofMoshaf=choosemoshaf.options[choosemoshaf.selectedIndex];
      const data_server=SelectedOptionsofMoshaf.dataset.server;
      const suarah_list2 =SelectedOptionsofMoshaf.dataset.surahlist;
    //   console.log(suarah_list2);
    //   console.log(data_server);
      
      GetSura(data_server,suarah_list2);
    });    
}  

const GetSura=async(server,Surah)=>{
  const res = await (await fetch(`${Apibase}/suwar`)).json();
  const choossura=document.getElementById('choossura');
    console.log(res);
 
 

    const SurahNames =res.suwar;
    console.log(server);
    
    Surah =Surah.split(',')
    choossura.innerHTML=`<option value=" ">اختر سوره</option>`
          Surah.forEach((e,ind)=>{
            console.log(res.suwar[ind].id);
            const PadSurah=e.padStart(3,'0');
            // console.log(PadSurah);
            
              SurahNames.forEach(element => {
                if (element.id == e ) {
                    console.log(element);
                    choossura.innerHTML += `<option value="${server}${PadSurah}.mp3">${element.name}</option>`;
                  }
              });
       
      // console.log(Surah);
choossura.addEventListener('change',(e)=>{
  const choossura=document.getElementById('choossura');
  const SelectedOptionsofSurah =choossura.options[choossura.selectedIndex];
  const gbg=SelectedOptionsofSurah.value;
  
  async function playwithplaySurahFun(){
    const res3 = await (await fetch(`http://api.alquran.cloud/v1/surah/${res.suwar[ind].id}/ar.alafasy`)).json();
    console.log(gbg);
    console.log(res3)
  let arr=[];
  const textContainer = document.getElementById("reading");
  const ayahreading=res3.data.ayahs;
  ayahreading.forEach((f, fi) => {

  })



  }
  playwithplaySurahFun();


  playSurah(gbg);
})

})

}






function playSurah (surahMp3){
  const audioPlayer=document.querySelector('#audioPlayer');
  console.log(surahMp3);

  transFuncAudio(surahMp3);
  audioPlayer.src =surahMp3;
  audioPlayer.play();
}
function transFuncAudio(sourcemb3){
  console.log(sourcemb3);
}

const playLive=(channel)=>{
      if(Hls.isSupported()) {
        var video = document.getElementById('video');
        var hls = new Hls();
        hls.loadSource(`${channel}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
     }
     // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
     // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
     // This is using the built-in support of the plain video element, without using hls.js.
      // else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      //   video.src = 'https://d26g5bnklkwsh4.cloudfront.net/adf856d9-a233-484b-a730-f7ac57c53aa5/master.m3u8';
      //   video.addEventListener('canplay',function() {
      //     video.play();
      //   });
      // }
}


//surahs started

// let apiSurahs=;




function searchByName(surahName){
  let abahs=document.querySelector('#abahs')
  const mainsec =document.querySelector('.mainsec');
  const searhByNmae=document.querySelector('#searhByNmae');


console.log(surahName[0].name)
let arr5=[];
for (let ind = 0; ind < surahName.length; ind++) {
  // console.log(surahName[ind]);
  let data =surahName[ind];
  arr5.push(data);
}
let arr6=[];
let arr7=[];
searhByNmae.addEventListener('change',()=>{
  if(searhByNmae.value===''){
    mainsec.innerHTML=' ';
    arr6=[];
    getSurahs();
  }
    for (let ind2 = 0; ind2 < arr5.length; ind2++) {
      // console.log(arr5[ind2])
      if (arr5[ind2].name==searhByNmae.value.toLowerCase()||arr5[ind2].englishNameTranslation.toLowerCase()==searhByNmae.value.toLowerCase()){
        console.log('Founded');
        arr6.push(arr5[ind2]);
        mainsec.innerHTML='';
      }
      else if(arr5[ind2].englishNameTranslation[0]!==searhByNmae.value[0].toLowerCase()){
        // console.log('Not Founded');
        // mainsec.innerHTML='';
        // alert('Not Founded')
      }else{
        console.log('Not Founded');
      }
    }
    for (let ind3 = 0; ind3 < arr6.length; ind3++) {
      mainsec.innerHTML+=`
      <div class="contentsec"style='margin:10px,text-align:center'>
      <h4 >${arr6[ind3].name}</h4>
      <h4 >${arr6[ind3].englishNameTranslation}</h4>
      </div>
      `
    }
    const allcont=document.querySelectorAll('.contentsec');
    
    allcont.forEach((e,ind)=>{
          e.addEventListener('click',()=>{
           console.log(ind);
           let subsec=document.querySelector('.subsec');
           document.querySelector('#toggel1').style.display='block';
           subsec.style.display='block';
           mainsec.style.display='none';
           document.querySelector('#readsurah3').innerText=`قراءه السور`;           
           apireading(arr6[ind].number);
          })
    })
    document.querySelector('#toggel1').style.display='none';
    // console.log(arr6);
    // console.log(arr7);
    
  })


}





const getSurahs=async()=>{
  const res = await (await fetch(`https://api.alquran.cloud/v1/meta`)).json();
  // console.log(res.data.surahs.references  );
  const data =res.data.surahs.references;
  console.log(res);
  const mainsec =document.querySelector('.mainsec');
  let submainsec=document.querySelector('.submainsec');
  let abahs=document.querySelector('#abahs')
  const searhByNmae=document.querySelector('#searhByNmae');
      searchByName(data);
  for (let ind = 0; ind < data.length; ind++) {
    let surahsearch=data[ind].name;
    let surahsearchENg=data[ind].englishNameTranslation;
    // console.log(data[ind]);
       if (searhByNmae.value==='') { 
        //  console.log(ind)
        mainsec.style.display='flex'
        submainsec.style.display='none'
        mainsec.innerHTML+=`
        <div class="contentsec"style='margin:10px,text-align:center'>
        <h4 >${data[ind].name}</h4>
        <h4 >${data[ind].englishNameTranslation}</h4>
        </div>
        `
        searhByNmae.value='';
      }
      let searchBySurahName=()=>{
        
      }
      
      //     searhByNmae.addEventListener('input',()=>{
        //       if (data[ind].englishNameTranslation.includes(searhByNmae.value)&&searhByNmae.value!=='') {
    //         console.log('founded');
    //         mainsec.style.display='none';
    //         submainsec.style.display='flex'
    //         submainsec.innerHTML+=`
    //         <div class="contentsec"style='margin:10px,text-align:center'>
    //                 <h4 >${surahsearch}</h4>
    //                 <h4 >${surahsearchENg}</h4>

    //             </div>
    //                         `
    //                         // mainsec.innerHTML='';
    //       }
    //  searhByNmae.value='';
    //     })
      
  }
  const allcont=document.querySelectorAll('.contentsec');
  
           allcont.forEach((e,ind)=>{
                 e.addEventListener('click',()=>{
                  console.log(ind);
                  
                  let subsec=document.querySelector('.subsec');
                  document.querySelector('#toggel1').style.display='block';
                  subsec.style.display='block';
                  mainsec.style.display='none';
                  document.querySelector('#readsurah3').innerText=`قراءه السور`;
                  apireading(data[ind].number);
                 })
           })
           document.querySelector('#toggel1').style.display='none';
  
}
async function apireading(num){
  console.log(num);
  
  const res = await (await fetch(`https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`)).json();
  console.log(res)
   console.log(res.data.ayahs);
   const ayahreading=res.data.ayahs;
   
   const arraudio=[];
   const arraudiotext=[];
   let subsec=document.querySelector('.subsec');
   let searhByNmae=document.getElementById('searhByNmae');
   let abahs=document.getElementById('abahs');
 
   ayahreading.forEach((f, fi) => {
    searhByNmae.style.display='none';
    abahs.style.display='none';
    console.log(f.audio)
    const audio=f.audio;
    const audiotext=f.text;
    arraudio.push(audio)
    arraudiotext.push(audiotext)

    
    // console.log(arraudio)
    // audioPlayer1.src=audio;
    // audioPlayer1.play();
    subsec.innerHTML+=`
    <hr style='color:red;height:3px'><p>${ f.text }</p>`;
  })
  console.log(arraudio);
  console.log(arraudiotext);
function audioPlauing() {
  let audioPlayer1 =document.getElementById('audioPlayer1');
  let indx =0;
  audioFunc(indx)
function audioFunc(ind){
  audioPlayer1.src=arraudio[ind];
  audioPlayer1.play();
  let xx = document.querySelectorAll('.subsec p');

  xx.forEach((f, fi) => {
    if (ind==fi) {
    f.style.color='red';
    f.style.fontSize='27px'
    }else if(ind>fi){
    let wordtext = f.innerText.split(' ');
    f.style.color='green';
    wordtext.map((word, index) =>{ 
      f.innerHTML+=`<span style='color:#ffffff id="word-${index}">${word} </span>`;
    }).join();

    }

  })
}
    audioPlayer1.addEventListener('ended',()=>{
      indx++;
      for (let index2 = 0; index2 < arraudiotext.length; index2++) {
        if (index2==indx) {
          console.log(indx,index2);
        }
      }
      audioFunc(indx);
      console.log(indx);
      
      if (indx===arraudio.length) {
        indx=0;
        let timerInterval;
        Swal.fire({
          title: "Surah has been Ended !....",
          html: "I will close in <b></b> milliseconds.",
          timer: 6000,
          background:'black',
          color:'red',
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            document.getElementById('toggel1').click();
          }
        });
      }
    })
}
audioPlauing();
  }
  
window.addEventListener('load',()=>{

  getSurahs();
})

// document.querySelector('#toggel1').addEventListener('click',()=>{
//   console.log('ss');
  
// })

//surahs ended 
// Hadith sections 
// let colorchoose=document.getElementById('chooceColor');
// colorchoose.addEventListener('select',()=>{
//            console.log(chooceColor);
// })
const  hadithcontainer=document.querySelector('.hadithcontainer .haconta');
const next=document.querySelector('.next');
const prev=document.querySelector('.prev');
const nextbtn=document.querySelector('.buttons .next button');
const prevbtn=document.querySelector('.buttons .prev button');
const number=document.querySelector('.number');
let hadithIndex=0;
const hadithApi ='https://api.hadith.gading.dev/books/muslim?range=1-150';
const gethadithwithAr = async()=>{
   const res = await (await fetch(hadithApi)).json();
   console.log(res);
   
   const data =res.data.hadiths;
   hadithcontainer.innerHTML+=data[0].arab;
   
     number.innerHTML=`   <p> رقم الحديث هو  ${hadithIndex} /  150</p> `;
  hadithcontainer.innerHTML=data[hadithIndex].arab;
    nextbtn.addEventListener('click',()=>{
      hadithIndex===0?++hadithIndex:hadithIndex===149?hadithIndex=0:++hadithIndex;
      hadithcontainer.innerHTML=data[hadithIndex].arab;
      number.innerHTML=`   <p> رقم الحديث هو  ${hadithIndex} /  150</p> `
      console.log(hadithIndex);
     })

    prevbtn.addEventListener('click',()=>{
      hadithIndex===0?hadithIndex=0:--hadithIndex;
      hadithcontainer.innerHTML=data[hadithIndex].arab;
      number.innerHTML=`   <p> رقم الحديث هو  ${hadithIndex} /  150</p> `
      console.log(hadithIndex);
     })
  }

const inplan=document.querySelector('#inplan');

const hadithapiEng='https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud.json';
const gethadithwithENg = async()=>{
   const res2 = await (await fetch(hadithapiEng)).json();
   console.log(res2.hadiths);
   const  data= res2.hadiths;
   
   number.innerHTML=`   <p>Number of Hadith is  ${hadithIndex} /${data.length}  </p> `;
   hadithcontainer.innerHTML=data[0].text;
   nextbtn.addEventListener('click',()=>{
     hadithIndex===0?++hadithIndex:hadithIndex===`${data.length} `?hadithIndex=0:++hadithIndex;
     hadithcontainer.innerHTML=data[hadithIndex].text;
 
     number.innerHTML=`   <p>Number of Hadith is  ${hadithIndex} /${data.length}  </p> `;
     console.log(hadithIndex);
    })

   prevbtn.addEventListener('click',()=>{
     hadithIndex===0?hadithIndex=0:--hadithIndex;
     hadithcontainer.innerHTML=data[hadithIndex].text;
     number.innerHTML=`   <p>Number of Hadith is  ${hadithIndex} /  ${data.length}  </p> `;
     console.log(hadithIndex);
    })
}
const sub=document.querySelector('#sub');
let num =0;
sub.addEventListener('click',()=>{
    if (inplan.value.toLowerCase()==='ar') {
      num++
      if (num==1){
        console.log(num);
      }else if(num===2){
       window.location.reload();
       gethadithwithAr();
      }
      hadithcontainer.innerHTML='';
      gethadithwithAr();
      sub.style.display='none'
      inplan.value=''
      return hadithIndex=0;
    }else if(inplan.value.toLowerCase()==='en'){
      num++
      if (num==1){
        console.log(num);
      }else if(num==2){
        window.location.reload();
       return gethadithwithAr();
      }
      hadithcontainer.innerHTML='';
      gethadithwithENg();
      sub.style.display='none'
      inplan.value=''
      return   hadithIndex=0;
    }else if(inplan.value===''){
      return alert('PLZ ......  Try Again ')
    }else{
      console.log('Error accured');
      alert('Error..... try Again')
    }
  })
inplan.addEventListener('input',()=>{
      sub.style.display='block'
})
//Ended Hadith Sections 
