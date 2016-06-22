#System integration process for IoT

In the IoT world, there is no common standard process, so you have to develop system integration process for each use case!

This project is to seek the best practice for the use case "ALPR".

```
               Use case 1   Use case2   Use case3 ...
                                          ALPR
                                          
People            [ ]          [ ]      Customers
                                            :
User Interface    [ ]          [ ]  Browser on smart phone
                   |            |           |
Application       [ ]          [ ]   Car Search portal
                   |            |           |
SaaS/PaaS/IaaS    [ ]          [ ]  AWS(IoT/EC2/DynamoDB)
                   |            |           |
Network           [ ]          [ ]     The Internet
                   |            |           |
IoT gateway       [ ]          [ ]  Appl. on Raspberry Pi 3
                   |            |           |
Connector         [ ]          [ ]        Cable
                   |            |           |
Sensor            [ ]          [ ]     Camera module
                                            :
Thing             [ ]          [ ]         Cars


Note: each layer itself involves system integration process of its layer for each use case!

AWS(IoT/EC2/DynamoDB)         [ ]->[ ]->[ ]->[ ]->[ ]->...
            (e.g, launching an EC2 instance, opening HTTP port 80 ...)

Appl. on Raspberry Pi 3       [ ]->[ ]->[ ]->[ ]->[ ]->...
            (e.g, building OpenALPR/OpenCV, modifying its config ...)
```
