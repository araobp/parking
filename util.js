var os = require('os');

exports.getLocalAddress = function (ifname) {
    var interfaces = os.networkInterfaces();
    var addresses = [];

    for (var dev in interfaces) {
        interfaces[dev].forEach(function(details){
            if (!details.internal){
                switch(details.family){
                    case "IPv4":
                        if (dev == ifname) { 
                          addresses.push(details.address);
                        };
                    break;
                }
            }
        });
    }
    return addresses;
};
