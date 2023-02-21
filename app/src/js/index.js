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


const submitBtn = document.querySelector('#submit');


//Fargo cord. = lat = 46.8772, lon = -96.7898

let lat = '';
let lon = '';

submitBtn.addEventListener('click', getLocation);

async function getLocation(e) {
  e.preventDefault();

  const cityState = document.getElementById('cityState').value;
  //console.log(cityState);


  //Big if block to catch empty input field error, prevent from attemping to connect to API when empty
  //prompt user to enter city and state
  if (cityState) {

    //Turn string from user input into an array
    //Get city and state from array elements
    const locatioinArray = cityState.split(',');
    const city = (locatioinArray[0]);
    const state = (locatioinArray[1]);
    
    
    try {
      const locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},us&limit=5&appid=${APIkey}`);

      const data = await locationResponse.json();
      const cityLocation = Object.values(data);

     
      //Get latitude and longitude from data obj
      lat = (cityLocation[0]['lat']);
      lon = (cityLocation[0]['lon']);

      //lat and lon variables are now populated.
      //Run getweather function
      getWeather();


    } catch (error) {

     const  errormsg = `<div id='error'>Invalid input. Please enter city and state.</div>`;
      document.getElementById("APIinfo").innerHTML = errormsg;

    };
   
    } else {
      const msg = `<div id='error'>Input field cannot be empty.<br/>Please enter a city and state.</div>`;
      document.getElementById("APIinfo").innerHTML = msg;
  };


} 

 
//Call API with lat and log cordinates
async function getWeather () {
  //e.preventDefault();
try {
  const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=524901&appid=${APIkey}`);
    const data = await weatherResponse.json();
    const myCity = Object.values(data);
    //console.log(myCity);
      //Call render function to get weather info from array Obj
      //Then add pre-build html block from reder return function with weather data
      const APIdata = render(data);
      document.getElementById("APIinfo").innerHTML = APIdata;
   
} catch (error) {
  const errormsgWeather = `<div id='error'>Error processing!</div>`;
  document.getElementById("APIinfo").innerHTML = errormsgWeather;
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
//Insert data into HTML divs. Then send back to caller
let myString = `    
          <div id="userCity">${myNewCity}, ${userCountry}</div>
          <div id="date">${convertedDate}</div>

          <div id="myHr"></div>

          <div class="myAlign">Temp:  ${convTemp}&#8457;</div>
          <div class="myAlign">Weather:  ${weather}</div>
          <div class="myAlign">Temp Range: ${convhighTemp}&#8457; / ${convLowTemp}&#8457;</div>
          
     
`;

//Access code
//console.log(`${responseCode}`);
return myString;

  
} ;


//Convert date format
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

//Convert temps
function convertKelvin(kelvin) {
  const newTemp = (kelvin - 273.15) * 9 / 5 + 32 * 10 /10;
  //const convertedTemp = newTemp.toFixed(1);
  const convertedTemp = Math.round(newTemp);
return convertedTemp;
}