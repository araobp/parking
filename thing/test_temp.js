temp = require('./temperature.js')

setInterval(function() {
  temp.get(function(t) {
    console.log(t)
  })
}, 5000)

