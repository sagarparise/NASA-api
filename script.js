// document.addEventListener('DOMContentLoaded', function () {
//   getCurrentImageOfTheDay();
//   loadSearchHistory();
// });

// document.getElementById('search-form').addEventListener('submit', function (e) {
//   e.preventDefault();
//   getImageOfTheDay();
// });

// document.getElementById('search-history').addEventListener('click', function (e) {
//   if (e.target.tagName === 'LI') {
//       const selectedDate = e.target.textContent;
//       getImageOfTheDay(selectedDate);
//   }
// });

// function getCurrentImageOfTheDay() {
//   const currentDate = new Date().toISOString().split("T")[0];
//   console.log(currentDate);
//   getImageData(currentDate);
// }

// function getImageOfTheDay(selectedDate) {
//   const date = selectedDate || document.getElementById('search-input').value;
//   getImageData(date);
//   saveSearch(date);
// }

// function getImageData(date) {
//   const apiKey = 'QPKkHiYsgfTCimSxyWRduc5jIgMmdu2DB46mPakc';
//   const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

//   fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//           displayImageData(data);
//           addSearchToHistory(date);
//       })
//       .catch(error => console.error('Error fetching data:', error));
// }

// function displayImageData(data) {
//   const container = document.getElementById('current-image-container');
//   container.innerHTML = `
//       <h2>${data.title}</h2>
//       <img src="${data.url}" alt="${data.title}" style="max-width: 100%;">
//       <p>${data.explanation}</p>
//   `;
// }

// function saveSearch(date) {
//   let searches = JSON.parse(localStorage.getItem('searches')) || [];
//   searches.push(date);
//   localStorage.setItem('searches', JSON.stringify(searches));
// }

// function addSearchToHistory(date) {
//   const historyList = document.getElementById('search-history');
//   const listItem = document.createElement('li');
//   listItem.textContent = date;
//   historyList.appendChild(listItem);
// }

// function loadSearchHistory() {
//   const searches = JSON.parse(localStorage.getItem('searches')) || [];
//   const historyList = document.getElementById('search-history');
//   searches.forEach(date => {
//       const listItem = document.createElement('li');
//       listItem.textContent = date;
//       historyList.appendChild(listItem);
//   });
// }

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
  li.innerHTML= `${ data.date}`;
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

