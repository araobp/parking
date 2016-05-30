#!/bin/bash

aws iot-data update-thing-shadow --thing-name alpr1 --payload '{"state": {"desired": {"url": "https://192.168.42.1", "site_id": "11th"}}}' /tmp/outfile.json
