// const express = require('express')
// const bodyParser = require('body-parser')
// const https = require('https')
// const app = express()

// app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

// app.post('/', function (req, res) {
//   const query = req.body.cityName
//   const apiKey = 'cd1393c1eb6e4d3557530660f0afc7d1'
//   const unit = 'metric'
//   const url =
//     'https://api.openweathermap.org/data/2.5/weather?q=' +
//     query +
//     '&appid=' +
//     apiKey +
//     '&units=' +
//     unit

//   https.get(url, function (response) {
//     response.on('data', function (data) {
//       const weatherData = JSON.parse(data)
//       const temp = weatherData.main.temp
//       const description = weatherData.weather[0].description
//       const imageURL =
//         'http://openweathermap.org/img/wn/' +
//         weatherData.weather[0].icon +
//         '@2x.png'
//       res.write('<h1>The weather description is ' + description + ' </h1>')
//       res.write(
//         '<h1>The temperature in ' +
//           query +
//           ' is ' +
//           temp +
//           ' degree celcius</h1>'
//       )
//       res.write('<img src=' + imageURL + '>')
//       res.send()
//     }) //response.on
//   }) //https
// }) //post
// app.listen(3000, function () {
//   console.log('Server is running on port 3000')
// })

//api-key: cd1393c1eb6e4d3557530660f0afc7d1
//api-call: https://api.openweathermap.org/data/2.5/weather?q=london&appid=cd1393c1eb6e4d3557530660f0afc7d1

//initialize
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const https = require('https')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {
  const city = req.body.cityName
  const apiKey = 'cd1393c1eb6e4d3557530660f0afc7d1'
  const unit = 'metric'
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=' +
    apiKey +
    '&units=' +
    unit

  https.get(url, function (response) {
    response.on('data', function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon

      res.write(
        '<h1>The temperature in ' +
          city +
          ' is ' +
          temp +
          ' degree celsius' +
          ' and the weather is ' +
          description +
          '</h1>'
      )

      res.write(
        '<img src=http://openweathermap.org/img/wn/' + icon + '@2x.png>'
      )
      res.send()
    })
  })
})

app.listen(3000, function () {
  console.log('Server is running on port 3000')
})
