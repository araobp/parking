#Where is my car?

![travi](./doc/travi.png)
![travi-alpr](./doc/PI-ALPR.png)

##Architecture

![WhereIsMyCar](https://docs.google.com/drawings/d/1_GiS80Nem-KqX6v-HBjz98eovvMlLeTybwrgqH_1kmg/pub?w=640&h=480)

##Software components used in this project
- node.js/express/angular.js with cassandra-driver
- [OpenALPR](https://github.com/openalpr/openalpr)
- [beanstalkd](http://kr.github.io/beanstalkd/)
- [node-eddystone-beacon](https://github.com/don/node-eddystone-beacon)
- [Cassandra](http://cassandra.apache.org)

##Building OpenALPR on Raspberry Pi

First, you have to build OpenCV. Follow the instructions here: http://docs.opencv.org/3.0-last-rst/doc/tutorials/introduction/linux_install/linux_install.html

Don't forget to install libv4l-dev before cmake:
```
$ sudo apt-get install libv4l-dev
```
And add this option to cmake: -DWITH_LIBV4L=ON

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

It took something like 10 seconds to recognize a number, so it is not plactical -- you should run alprd instead.

##node.js/express

You must install a middleware 'body-parser' for express POST operations:
```
$ sudo npm -g install body-parser
```

```
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );

app.post(  ...
```

##Cassandra setup

[Cassandra setup](./doc/cassandra.md)

Cassandra seems to use a number of threads (thus use multiple CPU cores), so it consumes a lot of electric power and the USB video cam loose power from an USB port of Rapsberry Pi. You need to use a powered USB hub.

##OpenALPR training for Japanese car licence plates

Take pictures of Japanese license plates, then use the following utilites to train OpenALPR:

- https://github.com/openalpr/train-ocr
- https://github.com/openalpr/train-detector

However, for the time being, you may use country = us and use a matching pattern "####(4 digits)" by modifying the following file:
https://github.com/openalpr/openalpr/blob/master/runtime_data/postprocess/us.patterns

##Do I need ??? Time for reality check!

####Do I need MQTT?
No, I don't. alprd/beanstalkd and nodejs-based REST server (app.js) suffice for the time being. 

Note that MQTT server can be SPOF.

####Do I need MongoDB?
No, I don't. I prefer Cassandra over MongoDB.

####Do I need AWS DynamoDB and Lambda?
No, I don't. The combination of "beanstalkd - app.js(node.js/express) - Cassandra" is much simplar and cheaper than those of AWS. I can even create a cluster of Cassandra with multiple Raspberry Pi 3. In near future, I will try that.

####Do I need an IOT framework/platform?
No, I don't. It's a lot easier and faster to develop an IOT system based on MEAN stack with your preferred SQL/NoSQL rather than a heavy-weight framework/platform.
