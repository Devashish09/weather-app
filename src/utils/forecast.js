// challenge 
const request =  require('request');

const forecast = (latitude, longitude, callback ) =>{
    const url = 'https://api.darksky.net/forecast/d8989755337177f7890213a31e55bbee/'+ latitude +',' + longitude;
      
     //used destructuring because response object has body property
    request({ url , json : true }, (error, { body })=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
          callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. 
          This high today is ${body.daily.data[0].temperatureHigh} with a law of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}


module.exports =  forecast;