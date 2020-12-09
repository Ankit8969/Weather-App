const express =require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { env } = require('process');
const app = express();

console.log("Active Pages")

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));
var temp=25.04;
var temp_min=25.04;
var temp_max=30.25;
var countryName = "IN";
var cityName="Forbesganj";

const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    console.log("REdirected");
    res.render('home',{temprature:temp ,temprature_min:temp_min, temprature_max:temp_max , countryNames:countryName , cityname:cityName});
});

app.post('/', (req, res) => {
    cityName = req.body.place;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&&appid=d71f52c3469def6eff6b3e671e44c4d8#`;

    https.get(url , (response)=>{
        console.log(response.statusCode);
        if (response.statusCode === 404)
        {
            res.send("Enter Valid City Name!");
        }
        else
        response.on('data' ,(data)=>{

            // print the data in JSON format in below 2 line !
            const weatherData = JSON.parse(data);
            
            countryName = (weatherData.sys.country);

            temp =weatherData.main.temp;
            temp_min = weatherData.main.temp_min;
            temp_max = weatherData.main.temp_max;

            res.redirect('/');
            console.log("Error");
        });
    });
});

app.listen(port,()=>console.log("Server is running"))

// <%= cityName %>,<%= countryName %> 