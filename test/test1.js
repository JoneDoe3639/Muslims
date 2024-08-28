async function apireading(){
    
    const res = await (await fetch(`http://api.alquran.cloud/v1/surah/1/ar.alafasy`)).json();
    let arr=[];
    const audioPlayer=document.getElementById('audio');
    const textContainer = document.getElementById("text");
    console.log(res)
    console.log(res.data.ayahs);
    const ayahreading=res.data.ayahs;
    textContainer.style.wordSpacing='3px'
    ayahreading.forEach((f, fi) => {
        const textFromAPI =`${f.text}`;
        console.log(textFromAPI);

   // النص القادم من الـ API
   console.log(textFromAPI)

// قسم النص إلى كلمات وضع كل كلمة في عنصر `span`

const words = textFromAPI.split(" ");
console.log(words);

textContainer.innerHTML = words.map((word, index) => `<span id="word-${index}">${word} </span>`).join("");

// إعداد wavesurfer.js لتحليل الصوت
const audioElement = document.getElementById("audio");
const wavesurfer = WaveSurfer.create({
    container: document.body,
    waveColor: 'violet',
    progressColor: 'purple',
    backend: audioPlayer,
    mediaControls: true,
    media: audioElement
});

// التعامل مع event الـ ready عند تحميل الصوت
wavesurfer.on('ready', function () {
    // تحديد المدة الزمنية لكل كلمة بناءً على عدد الكلمات
    const duration = wavesurfer.getDuration();
    const wordDuration = duration / words.length;

    // تحديث اللون بناءً على الوقت الحالي للصوت
    wavesurfer.on('audioprocess', function () {
        const currentTime = wavesurfer.getCurrentTime();
        words.forEach((word, index) => {
            const wordElement = document.getElementById(`word-${index}`);
            if (currentTime >= index * wordDuration && currentTime < (index + 1) * wordDuration) {
                wordElement.style.color = "red";
            } else {
                wordElement.style.color = "black";
            }
        });
    });
});

// تحميل الصوت عند النقر على التشغيل
audioElement.addEventListener('play', function () {
    wavesurfer.play();
});
         textContainer.innerHTML+=`${f.text}`;

       console.log(f.audio);
       console.log(f)
       arr.push(f.audio)
     })
     console.log(arr)
 let ind =0;
 audioPlayer.src=arr[ind];
//  audioPlayer.play();
 audioPlayer.addEventListener('ended',()=>{
    ind++;
    audioPlayer.src=arr[ind];

    if (ind===arr.length) {
        alert('Surah has been Ended')
    }
 })
   

}
apireading();
