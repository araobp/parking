#TensorFlow for Raspberry Pi

##Installation and test

https://github.com/samjabrahams/tensorflow-on-raspberry-pi

```
pi@raspberrypi:/usr/local/lib/python2.7/dist-packages/tensorflow/models/image/imagenet $ python classify_image.py
giant panda, panda, panda bear, coon bear, Ailuropoda melanoleuca (score = 0.89233)
indri, indris, Indri indri, Indri brevicaudatus (score = 0.00859)
lesser panda, red panda, panda, bear cat, cat bear, Ailurus fulgens (score = 0.00264)
custard apple (score = 0.00141)
earthstar (score = 0.00107)
```

### Car recognition

I have also tested "classify_image.py" to recognize the following JPEG images as car:

Lexus IS 250: https://media.ed.edmunds-media.com/lexus/is-250/2014/oem/2014_lexus_is-250_sedan_base_fq_oem_3_423.jpg
```
sports car, sport car (score = 0.35326)
car wheel (score = 0.29320)
grille, radiator grille (score = 0.15563)
beach wagon, station wagon, wagon, estate car, beach waggon, station waggon, waggon (score = 0.07977)
racer, race car, racing car (score = 0.01234)
```

Nissan Note: https://car.kurumagt.com/wp-content/uploads/2015/08/ivo20150017-300x205.jpg
```
minivan (score = 0.90877)
minibus (score = 0.02228)
car wheel (score = 0.00255)
beach wagon, station wagon, wagon, estate car, beach waggon, station waggon, waggon (score = 0.00153)
vacuum, vacuum cleaner (score = 0.00121)
```

Nissan Note is not a mini van, but the shape is certainly like a mini van...

## Obtaining pictures for training TensorFlow

The following tool is useful for obtaining pictures matching a certain search key from Google:
https://github.com/teracow/googliser

```
$ cd
$ sudo apt-get install imagemagick
$ git clone https://github.com/teracow/googliser
$ cd googliser
$ mv googliser.sh ~/bin
$ googliser.sh -p "sedan" -n 120
```
