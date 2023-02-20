//https://openweathermap.org/api/geocoding-api

const APIkey = '390a56a4e5743b65dabe7b47f1c4c0f0';

const userZip = document.querySelector("input").value;
const submitBtn = document.querySelector('#submit');




submitBtn.addEventListener('click', () => {
    userZip ? console.log('True') : console.log('False');
    console.log(`${userZip}`);
    console.log(userZip);
});

























































