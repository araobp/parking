#Fivebeans

##Installation
```
$ sudo npm -g install fivebeans
```

##Getting started
http://www.jowanza.com/post/144007055959/getting-started-with-beanstalkd-and-nodejs

##Data flow

```
  [alprd] --> [beanstalkd] --> [agent.js]
```

##alprd config

/etc/openalprd/alprd.conf
```
upload_data = 0
```
