#! /usr/bin/env python

import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO_PIN = 13
GPIO.setup(GPIO_PIN, GPIO.OUT)

piezo = GPIO.PWM(GPIO_PIN, 100)
piezo.start(10)
time.sleep(1)

piezo.stop()
GPIO.cleanup()
