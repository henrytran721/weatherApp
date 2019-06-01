let weatherInput = document.querySelector('.weatherInput');
const submitBtn = document.querySelector('.submitBtn');
const weatherContainer = document.querySelector('.weatherContainer');
let weather = 'http://api.openweathermap.org/data/2.5/weather?q=';
let city = '';
let appId = '&apikey=031200831cebf3b09eec066d5ff2a15b&units=imperial';
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
    return url;
  } else {
    city = weatherInput.value.charAt(0).toUpperCase() + weatherInput.value.slice(1);
    url = weather + city + appId;
    fetchAPI();
    return url;
  }

    function fetchAPI() {
      console.log(url);
      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = function() {
        let data = JSON.parse(this.response);
        let weatherMood = data.weather[0].main;
        let temp = Math.round(data.main.temp) + '°';

        let cityDiv = document.createElement('div');
        cityDiv.classList.add('cityDiv');
        let header = document.createElement('h2');
        let tempText = document.createElement('h1');
        let conditionText = document.createElement('h2');
        if(city.indexOf('%20') >= 0) {
          let newCity = city.split('%20').join(' ');
          header.textContent = newCity;
          tempText.textContent = temp;
          conditionText.textContent = weatherMood;
        } else {
          header.textContent = city;
          tempText.textContent = temp;
          conditionText.textContent = weatherMood;
        }
        cityDiv.append(header, tempText, conditionText);
        weatherContainer.appendChild(cityDiv);
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
