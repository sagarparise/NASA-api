
const imageContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");

document.addEventListener("DOMContentLoaded", ()=>{
 getCurrentImageOfDay();
 showPreviousSearch();
})

function getCurrentImageOfDay(){
  let currentDate = new Date().toISOString().split("T")[0];
  getImageData(currentDate);
  
}

//search date function
document.getElementById("search-form").addEventListener("submit", (event)=>{
 event.preventDefault();
 getImageOfTheDay();
 
})

function  getImageOfTheDay(selectedDate)
{
let searchInput = document.getElementById("search-input");
let date = selectedDate || searchInput.value;
searchInput.value = '';
getImageData(date);


}
function getImageData(date){
  const apiKey = 'QPKkHiYsgfTCimSxyWRduc5jIgMmdu2DB46mPakc';
  const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

  fetch(apiUrl)
  .then((response)=>response.json())
  .then((data)=>{
   
    displayImageData(data);
    addDateSearchHistory(data);

  }).catch((error)=>{
    console.log(`Error: ${error}`);
  })

}
function displayImageData(data){
  console.log(data)
  imageContainer.innerHTML = ` <h1>Picture On Date ${data.date}</h1>
  <img src="${data.url}">
  <h2 class="title"> ${data.title}</h2>
  <p>${data.explanation}</p>`
}

function addDateSearchHistory(data){

 let existingDates = Array.from(searchHistory.children).map((item)=> item.innerHTML);
 // here check before append date repeated or not
if(!existingDates.includes(data.date))
{
  let li = document.createElement("li");
  li.innerHTML = `${ data.date}`;
  searchHistory.appendChild(li);
  saveSearch();
}
 
}

// while clicking on date in list then it will be excuted

searchHistory.addEventListener("click", (event)=>{
if(event.target.tagName === "LI"){

 let selectedDate = event.target.innerHTML;
 getImageOfTheDay(selectedDate);

}

});

// save data of previous search

function saveSearch(){
  localStorage.setItem("date", searchHistory.innerHTML);
}

function showPreviousSearch(){
  
  let storedHistory = localStorage.getItem('date');
 if(storedHistory){
  searchHistory.innerHTML = storedHistory;
 }
}

