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

const APIkey = "390a56a4e5743b65dabe7b47f1c4c0f0";
const submitBtn = document.querySelector("#submit");

let lat = "";
let lon = "";

submitBtn.addEventListener("click", getLocation);

async function getLocation(e) {
  e.preventDefault();

  const city = document.getElementById("city").value;

  //Big if block to catch empty input field error, prevent from attemping to connect to API when empty
  //prompt user to enter city.
  if (city) {
    try {
      //API call 1
      //Take user input city to get latitude and longitude cordinates
      const locationResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},us&limit=5&appid=${APIkey}`
      );

      const data = await locationResponse.json();
      const cityLocation = Object.values(data);

      //Get latitude and longitude from data obj
      lat = cityLocation[0]["lat"];
      lon = cityLocation[0]["lon"];

      //API call 2
      //Send lat and lon cordinates and get weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=524901&units=imperial&appid=${APIkey}`
      );
      const data1 = await weatherResponse.json();
      const myCity = Object.values(data1);

      //Call render function to get weather info from array Obj
      //Then add pre-build html block from render's return function with weather data inserted.
      const APIdata = render(myCity);
      document.getElementById("APIinfo").innerHTML = APIdata;
    } catch (error) {
      const errormsg = `<div id='error'>Invalid input. Please enter city.</div>`;
      document.getElementById("APIinfo").innerHTML = errormsg;
    }
  } else {
    const msg = `<div id='error'>Input field cannot be empty.<br/>Please enter a city.</div>`;
    document.getElementById("APIinfo").innerHTML = msg;
  }
}

const render = function (arrObj) {
  //turn object into an array of arrays
  const myCity = Object.values(arrObj);

  const responseCode = myCity[0];
  const myNewCity = myCity[4]["name"];
  const userCountry = myCity[4]["country"];

  //const todaysDate = (myCity[3][0]['dt_txt']);
  const todaysDate = Date().toString().split(" ");
  const convertedDate = convertDate(todaysDate);

  const temp = Math.round(myCity[3][0]["main"]["temp"]);

  let weather = myCity[3][0]["weather"][0]["description"];
  weather = capitalizeFirstLetter(weather);

  const highTemp = Math.round(myCity[3][0]["main"]["temp_max"]);

  const lowTemp = Math.round(myCity[3][0]["main"]["temp_min"]);

  //Insert data into HTML divs. Then send back to caller
  let myString = `    
          <div id="userCity">${myNewCity}, ${userCountry}</div>
          <div id="date">${convertedDate}</div>

          <div id="myHr"></div>

          <div class="myAlign">Temp:  ${temp}&#8457;</div>
          <div class="myAlign">Weather: ${weather}</div>
          <div class="myAlign">Temp Range: ${highTemp}&#8457; / ${lowTemp}&#8457;</div>`;

  //Access code
  //console.log(`${responseCode}`);
  return myString;
};

//Convert date format
function convertDate(todaysDate) {
  //Deconstruct numeric date
  let [dayElem, monthElem, dateELem, yearElem] = todaysDate;
  //console.log(dayElem + monthElem + dateELem + yearElem);

  //months obj use for reference for month abbreviations
  const months = {
    jan: "january",
    feb: "february",
    mar: "march",
    apr: "april",
    may: "may",
    jun: "june",
    jul: "july",
    aug: "august",
    sept: "september",
    oct: "october",
    nov: "november",
    dec: "december",
  };

  //access month object to get non-abbreviated month
  //send month to get first letter capitalezed
  monthElem = capitalizeFirstLetter(months[monthElem.toLowerCase()]);

  //save day with comma
  dayElem = dayElem + ", ";

  //Put all part of the date string together
  const finalDate = `${dayElem} ${monthElem} ${dateELem} ${yearElem}`;

  return finalDate;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
