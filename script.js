let weatherInput = document.querySelector('.weatherInput');
const submitBtn = document.querySelector('.submitBtn');
const weatherContainer = document.querySelector('.weatherContainer');
let weather = 'https://api.openweathermap.org/data/2.5/weather?q=';
let city = '';
let appId = '&apikey=031200831cebf3b09eec066d5ff2a15b&units=imperial';
let weatherArr = [];

window.addEventListener('load', function() {
  let weatherStorage = localStorage.getItem('weatherInput');
  let weatherStr = weatherStorage.split(',');
  if(weatherStorage.indexOf(',') <= 0) {
    url = weather + weatherStorage + appId;
    console.log(url);
  } else {
    for(let i = 0; i < weatherStr.length; i++) {
      url = weather + weatherStr[i] + appId;
    }
  }
});

function weatherValue() {
  let space = ' ';
  let url = '';
  // if input has no value
  if(city = '') {
    alert('Please enter a valid city.');
  } else if(weatherInput.value.indexOf(space) >= 0) {
    // receive the value from input and capitalize the first letter
    city = weatherInput.value.split(' ').join('%20');
    url = weather + city + appId;
    fetchAPI();
    weatherArr.push(weatherInput.value);
    localStorage.setItem('weatherInput', weatherArr);
    return url;
  } else {
    city = weatherInput.value.charAt(0).toUpperCase() + weatherInput.value.slice(1);
    url = weather + city + appId;
    weatherArr.push(weatherInput.value);
    localStorage.setItem('weatherInput', weatherArr);
    console.log(localStorage.getItem('weatherInput'));
    fetchAPI();
    return url;
  }
    function fetchAPI() {
      localStorage.setItem('data', url);
      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onloadend = function() {
        if(request.status === 200) {
          console.log('success');
        } else {
          alert('Oops! You have entered a nonexisting city. Please enter a valid city.');
        }
      }
      request.onload = function() {
        let data = JSON.parse(this.response);
        let weatherMood = data.weather[0].main;
        let temp = Math.round(data.main.temp) + '°';
        let icon = data.weather[0].icon;
        let cityDiv = document.createElement('div');
        cityDiv.classList.add('cityDiv');
        let header = document.createElement('h2');
        let tempText = document.createElement('h1');
        let conditionText = document.createElement('h2');
        let img = document.createElement('img');
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        if(city.indexOf('%20') >= 0) {
          let newCity = city.split('%20').join(' ');
          header.textContent = newCity;
          tempText.textContent = temp;
          conditionText.textContent = weatherMood;
          img.src = 'http://openweathermap.org/img/w/' + icon + '.png';
          deleteBtn.textContent = 'X';
        } else {
          header.textContent = city;
          tempText.textContent = temp;
          conditionText.textContent = weatherMood;
          img.src = 'http://openweathermap.org/img/w/' + icon + '.png';
          deleteBtn.textContent = 'X';
        }
        cityDiv.append(header, tempText, conditionText, img, deleteBtn);
        weatherContainer.appendChild(cityDiv);
        deleteBtn.addEventListener('click', function(e) {
          weatherContainer.removeChild(cityDiv);
        })
      }
      request.send();
    }
}
submitBtn.addEventListener('click', function() {
  weatherValue();
  weatherInput.value = '';
});
window.addEventListener('keypress', function(e) {
  if(e.keyCode === 13) {
    weatherValue();
    weatherInput.value = '';
  }
})
