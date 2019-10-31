const path =  require('path');
const express  =  require('express');
const hbs  = require('hbs');
const geocode =  require('./utils/geocode');
const forecast = require('./utils/forecast');

const app =  express();
const port =  process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath =  path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const  partialPath  =  path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);


// Setup static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index',{
        title : 'Weather',
        name :  'Devashish'
    })
});

app.get('/about',(req, res)=>{
    res.render('about',{
        title : 'About',
        name : 'Devashish' 
    });
}); 

app.get('/help',(req, res)=>{
    res.render('help',{
        title : 'Help page',
        name : 'Tyler durdon' 
    });
}); 

console.log(__dirname);
console.log(__filename);

// app.get('',(req, res)=>{
//     res.send('Hello express <h1>Hello </h1>');
// }); 

// app.get('/help',(req,res)=>{
//     // res.send('This is help page');
//     res.send([{
//         name : 'Andrew'
//     },{
//         name: 'Sarah corner'
//     }])
// });

// app.get('/about',(req,res)=>{
//     // res.send('This is about page');
//   res.send('<h1>about </h1>');
// });

// app.get('/weather',(req,res)=>{
//     // res.send('This is weather page');
//     res.send([{
//         forecast : 'This is snowing',
//         location: 'Bundi'
//     }])
// });

app.get('/weather', (req,res)=>{
     if(!req.query.address){
        return res.send({
             error: 'You must proivde an address term'
         })
     } 

     geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
         if(error){
             return res.send({ error })
         } 
         
         forecast(latitude, longitude, ( error, forecastData)=> {
           if(error){
               return res.send({error})
           }

           res.send({
               forecast : forecastData ,
               location,
               address :  req.query.address
           })
         })
     })
    //  res.send({
    //      forecast : 'This is snowing',
    //      location: 'Bundi',
    //      address : req.query.address
    //  })
})


app.get('/product', (req,res)=>{
    // req.query get data from url which is present in key and value pair
    console.log(req.query.search);
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    res.send({
        product : req.query.search
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title : '404',
        name : 'Devashish',
        errorMessage : 'Help page not found.'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title : '404',
        name : 'Devashish',
        errorMessage : 'Page not found.'
    })
})

// Sequence static ->default-> some path -> not matched path  

app.listen(port,()=>{
    console.log('Server is up on  port 3000.');
});

