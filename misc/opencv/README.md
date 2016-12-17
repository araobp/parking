# OpenCV

## Installation on Raspberry Pi 3

Install libv4l-dev before building OpenCV:
```
$ sudo apt-get install libv4l-dev
```

Follow the instructions here to build OpenCV: http://docs.opencv.org/3.0-last-rst/doc/tutorials/introduction/linux_install/linux_install.html

Add the following options to cmake:
```
-D WITH_LIBV4L=ON
-D OPENCV_EXTRA_MODULES_PATH = <path to opencv_contrib/modules/>
```

It took one hour to complete the build processes.

## Working with Pi Camera

http://www.pyimagesearch.com/2015/03/30/accessing-the-raspberry-pi-camera-with-opencv-and-python/

```
$ sudo pip install "picamera[array]"
```
