##Preparation

```
$ sudo npm -g install ini
```

##Device Mmnagement message sequence diagram

```

    Thing                   AWS IoT
      |                        |
      |     /get               |
      |----------------------->|
      |     /getaccepted       |
      |<-----------------------|
      |                        |
     (1)                       |
      |     /update/accepted   |
      |<-----------------------|
     (2)                       |
      |                        |

(1) modify /etc/openalpr/alprd if required, then lanuch alprd.
(2) modify /etc/openalpr/alprd if required, then restart alprd.
```

Experiment
```
pi@raspberrypi:~/parking/aws $ ./agent.sh
received state on alpr1: {"state":{"desired":{"site_id":"7th"},"reported":{"site_id":"6th"},"delta":{"site_id":"7th"}},"metadata":{"desired":{"site_id":{"timestamp":1464014732}},"reported":{"site_id":{"timestamp":1464014732}}},"timestamp":1464014738}
```
