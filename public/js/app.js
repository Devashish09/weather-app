const fetch = require('node-fetch');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})


const weatherForm =  document.querySelector('form');
const search =  document.querySelector('input');
const messageOne =  document.querySelector('#message-1');  //querySelector matches first appearence element
const messageSecond =  docuemnt.querySelector('#message-2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location =  search.value ; 
 
    messageOne.textContent = 'Loading...' ;
    messageSecond.textContent =  ''
     
    fetch('/weather?address=kota' +location).then((response) => {
    response.json().then((data)=>{
       if(data.error){
           messageOne.textContent =  data.error;
           console.log(data.error);
       } else {
           messageOne.textContent  = data.location ;
           messageSecond.textContent = data.forecast ;
           console.log(data.location);
           console.log(data.forecast);
       }
    })
})
})