const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req , res){
res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req , res) {

  var query = req.body.cityName;
 var units = "metric";
 var appKey = "48a47d8fc7c206b789cd4f0ae9a0a27c";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ units+ "&appid=" + appKey;

https.get(url , function(response){
  console.log(response.statusCode);

  response.on("data" , function (data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
   const weatherDescription = weatherData.weather[0].description;
   const icon = weatherData.weather[0].icon;
   const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


   res.write("<h1>The weather in " + query +  " " + temp + " degrees celcius.</h1>" );
   res.write("<p>The weather is currently " + weatherDescription + "</p>" );
   res.write("<img src =" +imgURL +">")
   res.send();
  });
});

});

app.listen(3000 , function(){
  console.log("The server is starter with port: 3000.");
});
