const APIkey = '390a56a4e5743b65dabe7b47f1c4c0f0';


const submitBtn = document.querySelector('#submit');


//Fargo cord. = lat = 46.8772, lon = -96.7898

let lat = '';
let lon = '';

submitBtn.addEventListener('click', getLocation);

async function getLocation(e) {
  e.preventDefault();

  const inputCity = document.getElementById('city').value;
  //console.log(inputCity);


  //Big if block to catch empty input field error, prevent from attemping to connect to API when empty
  //prompt user to enter city and state
  if (inputCity) {

    //Turn string from user input into an array
    //Get city and state from array elements
    const locatioinArray = inputCity.split(',');
    const city = (locatioinArray[0]);
    const state = (locatioinArray[1]);
    
    
    try {
      const locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},us&limit=5&appid=${APIkey}`);

      const data = await locationResponse.json();
      const cityLocation = Object.values(data);
      //console.log(cityLocation);
     
      //Get latitude and longitude from data obj
      lat = (cityLocation[0]['lat']);
      lon = (cityLocation[0]['lon']);

      //lat and lon variables are now populated.
      //Run getweather function
      getWeather();


    } catch (error) {

     const  errormsg = `<div id='error'>Invalid input. Please enter city.</div>`;
      document.getElementById("APIinfo").innerHTML = errormsg;

    };
   
    } else {
      const msg = `<div id='error'>Input field cannot be empty.<br/>Please enter a city.</div>`;
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
const myCity = Object.entries(arrObj);
console.log(myCity);

const sunrise = myCity[4][1]['sunrise'];
const sunSet = myCity[4][1]['sunset'];
const hoursSinceEp = sunrise/86400000;
console.log(sunSet/86400000);

return hoursSinceEp;
};