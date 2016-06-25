#Thing agent

##Thing managment

The things are managed via AWS IoT Shadow. Open AWS Management Console and modify IoT Shadow that will synchronize with the state on the things. 

Thing configuration parameters managed by AWS IoT are as follows:
- "site_id"
- "url" emitted by Eddystone(BLE)
- "upload_address" where alprd uploads the results 

```
{
  "desired": {
    "site_id": "9th floor",
    "url": "http://10.0.0.1/",
    "upload_address": "http://localhost:80/push",
    "garage_id": 32
  },
  "reported": {
    "site_id": "9th floor",
    "url": "http://10.0.0.1/",
    "upload_address": "http://localhost:80/push",
    "garage_id": 32
  }
  ```

Note: "upload_address" is used for the minimum setup only: app.js runs on Raspberry Pi 3 (not on an AWS EC2 instance). 

##Sensor data (time-series data)

The things use a RPi camera module and OpenALPR to capture automotive license plate numbers and recognize the numbers. Those numbers are sent to AWS DynamoDB (or Cassandra or MongoDB depending on the config) via AWS IoT MQTT broker.

```
                                                                                    topic: alprd
[camera] -- /dev/video0 --> [alprd] --> [beanstalkd] --> [agent.js] -- MQTT/TLS --> [AWS IoT MQTT broker] -->  [AWS DynamoDB]
```

The thing also supports the following sensor:
- Temperature sensor: MCP9700-E/TO with MCP3008 AD converter

```
                                                          topic: sensor
[sensor] -- /dev/spidev0.0 --> [agent.js] -- MQTT/TLS --> [AWS IoT MQTT broker] -->  [AWS DynamoDB]
```

##Installing AWS IoT SDK for JavaScript

```
$ git clone https://github.com/aws/aws-iot-device-sdk-js.git
$ cd aws-iot-device-sdk-js
$ sudo npm -g install
```
##Thing certificate installation
Certification installation for your things is a bit cumbersome.

First off, you need to issue certificates and config.json for your things at AWS Management Console.

Then download the each certificate along with config.json onto each of your things.

##Shadow client (agent.js)

I have written a code that works as a AWS Shadow client.

Use the following shell script to launch it:
```
$ ./agent.sh
```

##Updating AWS Shadow

Update the shadow on the AWS management console. The agent script receives the update(delta) via MQTT/TLS.

```
pi@raspberrypi:~/parking/thing $ ./agent.sh
thingName: alpr1
alprd daemon started.
connected
alprd(1171) killed
alprd(1166) killed
received delta on alpr1: {"timestamp":1465061173,"state":{"site_id":"11th","url":"https://10.0.0.1"},"metadata":{"site_id":{"timestamp":1465061173},"url":{"timestamp":1465061173}}}
updating site_id: 11th
alprd daemon restarted.
updating url: https://10.0.0.1
alprd(1322) killed
alprd(1321) killed
```

##AWS CLI client

Use the following shell script to update the AWS Shadow from your terminal:
```
$ ./shadow.sh
```

