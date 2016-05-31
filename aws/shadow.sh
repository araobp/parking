#!/bin/bash

aws iot-data update-thing-shadow --thing-name alpr1 --payload '{"state": {"desired": {"url": "https://192.168.42.1", "site_id": "11th", "upload_address": "http://localhost:80/push"}}}' /tmp/outfile.json
