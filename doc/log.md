##/var/log/alprd.log

```
INFO - Running OpenALPR daemon in daemon mode.
INFO - Using: /etc/openalpr/alprd.conf for daemon configuration
INFO - Using: /tmp for storing valid plate images
INFO - country: us -- config file: /etc/openalpr/openalpr.conf
INFO - pattern:
INFO - Stream 1: webcam
INFO - Starting camera 1
INFO - Video stream connecting...
INFO - Video stream connected
DEBUG - Writing plate 2645 (5th-cam1-1463240746636) to queue.
DEBUG - put job id: 1
INFO - Job: 1 successfully uploaded
DEBUG - Writing plate 2645 (5th-cam1-1463240747201) to queue.
DEBUG - put job id: 2
INFO - Job: 2 successfully uploaded
DEBUG - Writing plate Z645 (5th-cam1-1463240747820) to queue.
DEBUG - put job id: 3
INFO - Job: 3 successfully uploaded
DEBUG - Writing plate 2645 (5th-cam1-1463240751317) to queue.
DEBUG - put job id: 4
INFO - Job: 4 successfully uploaded
DEBUG - Writing plate 2645 (5th-cam1-1463240751865) to queue.
DEBUG - put job id: 5
INFO - Job: 5 successfully uploaded
DEBUG - Writing plate 2645 (5th-cam1-1463240752401) to queue.
DEBUG - put job id: 6
INFO - Job: 6 successfully uploaded
DEBUG - Writing plate 2645 (5th-cam1-1463240752934) to queue.
DEBUG - put job id: 7
INFO - Job: 7 successfully uploaded
DEBUG - Writing plate 2645 (5th-cam1-1463240753510) to queue.
DEBUG - put job id: 8
INFO - Job: 8 successfully uploaded
DEBUG - Writing plate 2645 (5th-cam1-1463240757652) to queue.
DEBUG - put job id: 9
INFO - Job: 9 successfully uploaded
DEBUG - Writing plate 2645 (5th-cam1-1463240758224) to queue.
DEBUG - put job id: 10
INFO - Job: 10 successfully uploaded
DEBUG - Writing plate 2645 (5th-cam1-1463240758778) to queue.
DEBUG - put job id: 11
INFO - Job: 11 successfully uploaded
DEBUG - Writing plate Z645 (5th-cam1-1463240759310) to queue.
DEBUG - put job id: 12
INFO - Job: 12 successfully uploaded
```
##app.js

```
pi@raspberrypi:~/parking $ sudo -E node app.js
Running...
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240746017,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 614.082642,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 91.034035,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 226.934067,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240746636',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240746650,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 546.043396,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 88.165001,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 137.413574,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240747201',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240747216,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 597.4823,
  regions_of_interest: [],
  results:
   [ { plate: 'Z645',
       confidence: 88.957939,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 134.170944,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240747820',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240750809,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 501.774506,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 87.720512,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 129.972534,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240751317',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240751331,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 528.83429,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 88.044128,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 135.244904,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240751865',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240751879,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 516.612122,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 85.625229,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 136.332809,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240752401',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240752416,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 512.991943,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 89.499573,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 126.394386,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240752934',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240752952,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 553.33429,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 88.548958,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 132.262421,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240753510',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240757050,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 597.135681,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 89.274406,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 128.486877,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240757652',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240757665,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 553.007019,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 89.062965,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 126.949646,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240758224',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240758237,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 535.834656,
  regions_of_interest: [],
  results:
   [ { plate: '2645',
       confidence: 88.211067,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 125.860802,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240758778',
  camera_id: 1,
  site_id: '5th' }
POST /push
{ version: 2,
  data_type: 'alpr_results',
  epoch_time: 1463240758795,
  img_width: 640,
  img_height: 480,
  processing_time_ms: 510.315125,
  regions_of_interest: [],
  results:
   [ { plate: 'Z645',
       confidence: 86.757751,
       matches_template: 0,
       plate_index: 0,
       region: '',
       region_confidence: 0,
       processing_time_ms: 126.278557,
       requested_topn: 10,
       coordinates: [Object],
       candidates: [Object] } ],
  uuid: '5th-cam1-1463240759310',
  camera_id: 1,
  site_id: '5th' }
```
