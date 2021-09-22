const express = require('express')
const https = require('https') //make get request to external server with node// https is a native node module, so installation required
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {
  //line 13-23, use the form data to generate an (endpoint url) to send to local server to make a get request to external server
  const query = req.body.cityName //uses bodyparser to data entered into the input field in the form
  const apiKey = 'cd1393c1eb6e4d3557530660f0afc7d1'
  const unit = 'metric'
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    apiKey +
    '&units=' +
    unit //url is weatherapi endpoint

  https.get(url, function (response) {
    //making a get request to weather site, refer documentation for syntax https.get(url, callback)

    response.on('data', function (data) {
      //calling the method 'on' and tapping into the event when data was received from weatherAPI
      const weatherData = JSON.parse(data) //logs data in neater and organised way in the form on JSON
      const temp = weatherData.main.feels_like
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      console.log(temp)
      console.log(description)
      res.write('<p>The weather is currently ' + description + '<p>')
      res.write(
        '<h1>The weather in ' + query + ' is ' + temp + ' degree celsius.</h1>'
      )
      res.write('<img src=' + imageURL + '>')
      res.send()
    })
  })
})

app.listen(3000, function () {
  console.log('server is running on the port 3000')
})

//'response' is response from external server to our server
//'res' is response from our server to the client
