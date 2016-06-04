#Thing managment

I use AWS IoT to manage my things remotely.

Thing configuration parameters managed by AWS IoT:
- site_id
- URL emitted by Eddystone(BLE)
- upload_address where alprd uploads the results

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

Finally, I have written a code that works as a AWS Shadow client.

Use the following shell script to launch it:
```
$ ./agent.sh
```

##Testing AWS Shadow

I updated the shadow on the AWS management console. The agent script received the update via MQTT/TLS.
```
pi@raspberrypi:~/parking/aws $ ./agent.sh
received delta on alpr1: {"timestamp":1463934664,"state":{"site_id":"6th"},"metadata":{"site_id":{"timestamp":1463934664}}}
6th
```
##AWS CLI client
Use the following shell script to update the AWS Shadow from your terminal:
```
$ ./shadow.sh
```

