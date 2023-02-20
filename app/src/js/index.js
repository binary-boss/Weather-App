// The following code starts Mock Service Worker tool which allows you to simulate a backend (an API) for building your apps that talk to a remote service. You can visit https://mswjs.io for details on this utility and check src/api/routes.js for a sample API route that you can edit/create as needed to simulate a real world API. This simulated backend will not be part of the completed application (built edition) and you must use a real world backend built using Node.js + Express or Java + Spring Boot to provide such a service.

// // If you do not require a simulated backend, you can remove the code shown below.
// if (process.env.NODE_ENV === 'development') {
//   const apiStatus = document.querySelector('#api-status');
//   import('../api/browser')
//     .then(({ worker }) => worker.start())
//     .then(() => fetch('/'))
//     .then((res) => res.json())
//     .then((res) => (apiStatus.innerText = res.message));
// }
/*

  OpenWeather.com
  API key = 390a56a4e5743b65dabe7b47f1c4c0f0

*/

const APIkey = '390a56a4e5743b65dabe7b47f1c4c0f0';

const userZip = document.getElementById('zip').value;
const submitBtn = document.querySelector('#submit');

userZip ? console.log('True') : console.log('False');
console.log(`${userZip}`);
//Fargo cord. = lat = 46.8772, lon = -96.7898

let lat = 46.8772;
let lon = -96.7898;

submitBtn.addEventListener('click', getWeather);




// async function getLocation(e) {
//   e.preventDefault();
//   //console.log(`hello from line 32 ${location}`);
//   try {
//     const locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=58103,us&appid=${APIkey}`);

//     const data = await locationResponse.json();
//     const cityLocation = Object.values(data);

//     //console.log(cityLocation);

//     lat = (cityLocation[2]);
//     lon = (cityLocation[3]);

//     getWeather();
//   } catch (error) {
//     document.getElementById("APIinfo").innerHTML = error.message;
//   };
// };

async function getWeather (e) {
  e.preventDefault();
try {
  const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=524901&appid=${APIkey}`);
    const data = await weatherResponse.json();
    const myCity = Object.values(data);
    //console.log(myCity);
    const APIdata = render(data);
       
    document.getElementById("APIinfo").innerHTML = APIdata;
} catch (error) {
  document.getElementById("APIinfo").innerHTML = error.message;
};



};

const render = function (arrObj) {

  //turn object into an array of arrays
const myCity = Object.values(arrObj);
const responseCode = myCity[0];
const myNewCity = (myCity[4]['name']);
const userCountry = (myCity[4]['country']);

const todaysDate = (myCity[3][0]['dt_txt']);
const convertedDate = convertDate(todaysDate);

const temp = (myCity[3][0]['main']['temp']);
const convTemp = convertKelvin(temp);

const weather = (myCity[3][0]['weather'][0]['description'])

const highTemp = (myCity[3][0]['main']['temp_max']);
const convhighTemp = convertKelvin(temp);

const lowTemp = (myCity[3][0]['main']['temp_min']);
const convLowTemp = convertKelvin(temp);

//console.log(myCity);
let myString = `    
          <div id="userCity">${myNewCity}, ${userCountry}</div>
          <div id="date">${convertedDate}</div>

          <div id="myHr"></div>

          <div class="myAlign">Temp:  ${convTemp}&#8457;</div>
          <div class="myAlign">Weather:  ${weather}</div>
          <div class="myAlign">Temp Range:  ${convhighTemp}&#8457; / ${convLowTemp}&#8457;</div>
          
     
`;
console.log(`${responseCode}`);
return myString;

  
} ;

function convertDate(date) {
  const numDate = date.split(' ');
  const shortDate = numDate[0].split('-');
  const yr = shortDate[0];
  const month = shortDate[1];
  const mydate = shortDate[2];

  const convertString = new Date(yr, month - 1, mydate);
  const myFinishedDate = (convertString.toDateString());

  return myFinishedDate;
};

function convertKelvin(kelvin) {
  const newTemp = Math.round((kelvin - 273.15) * 9 / 5 + 32) * 10 /10;

return newTemp;
}