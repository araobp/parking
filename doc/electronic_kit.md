# Electronic kit

I bought this kit: https://www.amazon.co.jp/gp/product/B00MRQ5U1Y/ref=oh_aui_detailpage_o00_s00?ie=UTF8&psc=1

##Parts

- [MCP3008](https://cdn-shop.adafruit.com/datasheets/MCP3008.pdf)

![mcp3008_4](./mcp3008_4.png)

- [MCP9700-E/TO](http://ww1.microchip.com/downloads/en/DeviceDoc/21942e.pdf)

![mcp9700_2](./mcp9700_2.png)

- [MI5](http://akizukidenshi.com/download/ds/macron/MI5_series_jp.pdf)

![cds_and_register](./cds_and_resister.png)

- [SG90(Servo motor)](http://akizukidenshi.com/download/ds/towerpro/SG90.pdf)

![sg90](./sg90.png)

I have installed [pi-blaster](https://github.com/sarfata/pi-blaster) to enable PWM on my Raspberry Pi 3.

I modified the constant in "pi-blaster.c" to adjust PWM frequency to 50Hz:
```
- #define CYCLE_TIME_US   10000
+ #define CYCLE_TIME_US   20000
  #define SAMPLE_US               10
  #define NUM_SAMPLES             (CYCLE_TIME_US/SAMPLE_US)
  #define NUM_CBS                 (NUM_SAMPLES*2)
```

Then I tested that the motor rotates its arm from -90 degree to +90 degree:
```
$ sudo ./pi-blaster
$ sudo echo "21=0.025" > /dev/pi-blaster
$ sudo echo "21=0.125" > /dev/pi-blaster
```

## Temperature calculation

####MCP9700 DC electrical characteristics
![mcp9700_1](./mcp9700_1.png)

####MCP3008 digital output code calculation
![mcp3008_1](./mcp3008_1.png)

####Temperature calculation
![equation](./equation.png)

##Luminousity calculation

![cds](./cds.png)

##Communicating with MCP3008 via SPI

Control bit: 1000

![mcp3008_2](./mcp3008_2.png)

Send [0x01, 0x80, 0x00] from your Raspberry Pi to MCP3008 via SPI. MCP3008 returns 10bit data (value range: 0 - 1023).

![mcp3008_3](./mcp3008_3.png)

##Code
I made [this code](../thing/adc.js) to obtain the output from MCP3008(CH0 and CH1) and calcuate the temperature and luminousity.
