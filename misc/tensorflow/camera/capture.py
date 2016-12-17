# import the necessary packages
from picamera.array import PiRGBArray
from picamera import PiCamera
import time
import cv2
import classify_image
import os
 
# initialize the camera and grab a reference to the raw camera capture
camera = PiCamera()
rawCapture = PiRGBArray(camera)
 
# allow the camera to warmup
time.sleep(0.1)
 
# grab an image from the camera
camera.capture(rawCapture, format="bgr")
img = rawCapture.array

BUFFER_DIR = '/var/hamster'

img = cv2.resize(img, (128, 96))
 
img_file = os.path.join(BUFFER_DIR, str(time.time())+'.jpg')
cv2.imwrite(img_file, img)
classify_image.maybe_download_and_extract()
classify_image.run_inference_on_image(img_file)
#os.remove(img_file)

