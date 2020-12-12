// select search button
document.getElementById('search-btn').addEventListener('click',()=>{
     
// collect input value for search song lyrics
    const value=document.getElementById('input-value').value;
    // api url
    const apiURL='https://api.lyrics.ovh/';
    // fetching
    fetch(`${apiURL}suggest/${value}`)
    .then(res=>res.json())
    .then(data=>{   
        let element=data.data; 
        let elements=element.slice(0,10)
        console.log(elements);
        // select result div for submiting element
        const result1=document.getElementById('result-1');
        result1.innerHTML=``
        elements.forEach(element => {  
            // song title collect in api
            const songTitle=element.title;
            const songArtist=element.artist;
            const songAlbum=element.album; 
            // cover image collect in api
            const cover=songAlbum.cover_medium;  
            // artist name collect in api
            const albumBy=songArtist.name;
            // title song collect  in api
            const mp3=element.preview;   
            // create div for submit element
            const div=document.createElement('div')
            div.innerHTML=`        <div class="result-box">
            <div class="intro">
                <p>Title : ${songTitle}</p>
                <p>Album by : ${albumBy}</p>
            </div>
            <img class="get-img" src="${cover}" title="Song cover image" alt="images">
            <audio class="get-audio" src="${mp3}" controls></audio>
            <a href="#here" onclick="getLyrics('${albumBy}','${songTitle}','${apiURL}')" class="get-btn"> get lyrics</a>
            </div>`
            result1.appendChild(div)
        });
    })
    
}) 
// 
function getLyrics(name,title,url){ 
        fetch(`${url}v1/${name}/${title}`)
        .then(res=>res.json())
        .then(data=>{ 
            const lyrics=data.lyrics; 
            const song=lyrics.replace(/(\r\n|\n|\r)/gi,"<br>")
            document.getElementById('result-2').innerHTML=`<h2 id="here"><strong>${name}--</strong>${title}</h2> <br> ${song}`
        })
}