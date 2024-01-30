let exlporeEl=document.getElementById("explore");
let youtubeContainer=document.getElementById("youtubeContainer")
let breakEl=document.createElement("br");
let displayResult=function(result){
  watchUrl="https://www.youtube.com/watch?v="+result.id.videoId
  anchorEl=document.createElement("a");
  anchorEl.textContent=watchUrl;
  anchorEl.target="_blank";
  anchorEl.href=watchUrl;
  
  youtubeContainer.appendChild(anchorEl);
  youtubeContainer.appendChild(breakEl);
}

function searchForResult(event){
  if(event.key==="Enter"){
    let searchValue=exlporeEl.value;
    let options={
      method:"GET"
    };
    let api_key="AIzaSyAlxa67pEbE1qHT6k0mJcZ4G0_dMUjeS2o";
    let url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${20}&q=${searchValue}&type=video&key=${api_key}`;
    fetch(url,options)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log(json)
      for (let items of json.items){
      displayResult(items);
  }})
  }
}
exlporeEl.addEventListener("keydown",searchForResult);