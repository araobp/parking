#Where is my car?

This project is just to study IOT with webcam on Raspberry Pi 3.

##Project goal

- Develop an IOT use case using Beacon(Eddystone) and webcam.
- Get used to USB Webcam manipulation.
- Learn node.js programming with MEAN stack (this project does not use MongoDB but Cassandra for time-series data).
- Learn HTML5(HTML/CSS/JS) programming for smart phones.

##Architecture

![WhereIsMyCar](https://docs.google.com/drawings/d/1_GiS80Nem-KqX6v-HBjz98eovvMlLeTybwrgqH_1kmg/pub?w=640&h=480)

##Software components used in this project
- motion
- OpenALPR
- eddystone-beacon
- node.js/express/angular.js with cassandra-driver
- Cassandra

##Building OpenALPR on Raspberry Pi

First, you have to build OpenCV. Follow the instructions here: http://docs.opencv.org/3.0-last-rst/doc/tutorials/introduction/linux_install/linux_install.html

It took one hour to complete the build processes.

Then, follow the instructions on this page: https://github.com/openalpr/openalpr/wiki/Compilation-instructions-%28Ubuntu-Linux%29

It took some ten minutes.

Check if ALPR works on your Raspberry Pi:
```
pi@raspberrypi:/tmp $ wget http://plates.openalpr.com/h786poj.jpg -O lp.jpg
--2016-05-10 20:45:51--  http://plates.openalpr.com/h786poj.jpg
Resolving plates.openalpr.com (plates.openalpr.com)... 54.231.114.105
Connecting to plates.openalpr.com (plates.openalpr.com)|54.231.114.105|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 62721 (61K) [image/jpeg]
Saving to: ‘lp.jpg’

lp.jpg              100%[=====================>]  61.25K   125KB/s   in 0.5s

2016-05-10 20:45:52 (125 KB/s) - ‘lp.jpg’ saved [62721/62721]

pi@raspberrypi:/tmp $ alpr lp.jpg
plate0: 8 results
    - 786P0      confidence: 90.1703
    - 786PO      confidence: 85.579
    - 786PQ      confidence: 85.3442
    - 786PD      confidence: 84.4616
    - 7B6P0      confidence: 69.4531
    - 7B6PO      confidence: 64.8618
    - 7B6PQ      confidence: 64.627
    - 7B6PD      confidence: 63.7444
```

It took something like 10 seconds to recognize a number, so it is not plactical -- you should run ALPR on a normal PC. not on Raspberry Pi. Anyway, this project is just for fun.

##Cassandra setup

![Cassandra setup](./doc/cassandra.md)

