var os = require('os');
var TARGET = 'eth0';
console.log(getLocalAddress(TARGET));

function getLocalAddress(target) {
    var interfaces = os.networkInterfaces();
    var address = '0.0.0.0';

    for (var dev in interfaces) {
        interfaces[dev].forEach(function(details){
            if (!details.internal){
                switch(details.family){
                    case "IPv4":
                        if (dev == target) { 
                          address = details.address;
                        };
                    break;
                }
            }
        });
    }
    return address;
};
