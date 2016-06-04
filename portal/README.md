#Portal

This portal runs on an AWS EC2 instance.

You may run it on RPi as well. In that case, you will also need to run either Cassandra or MongoDB on the RPi.

##Sensor data (time-series data)

Car location data is stored onto AWS DynamoDB (or Cassandra or MongoDB).

An owner of a car opens the portal and enters his/her cars licese plate number.

The portal searches the location data of the car and returns the data to him/her.

```
[camera] -- /dev/video0 --> [alprd] --> [beanstalkd] --> [agent.js] -- MQTT/TLS --> [AWS IoT MQTT broker] -->  [AWS DynamoDB]

     Browser                   Portal      DynamoDB
    (AngularJS)          (node.js/express)
        |                        |             |
        |------ GET ------------>|             |
        |                        |--- query -->|
        |                        |<-- result --|
        |<---- 200 OK -----------|             |
        |                        |             |
```

##Launching the portal

```
$ ./portal.sh
```

