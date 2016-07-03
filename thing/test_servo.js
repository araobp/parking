var servo = require('./servo.js');

angle = Number(process.argv[2])

servo.rotate(angle);

