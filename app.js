const express = require('express');
const app = express();
const port = 3000;

const https = require('https');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {

  const cityname = req.body.CityName;
  const units = "metric";
  const appid = "4d34d3eeb5dcdb3e4dd39aaff4343b1b";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + appid + "&units=" + units;
  https.get(url, function(response) {
    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      console.log(temperature);
      console.log(description);
      console.log(icon);

      res.write("<h1>The Temperature :" + temperature + "</h1>");
      res.write("<p>the description is:" + description + "</p>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    })
  })
})

app.listen(port, function() {
  console.log("Server is running on port 3000.");
})
