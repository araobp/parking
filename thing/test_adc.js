adc = require('./adc.js')

setInterval(function() {
  adc.get(function(d) {
    console.log(d)
  })
}, 5000)

