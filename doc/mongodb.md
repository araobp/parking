###MongoDB operations

```
> use lpn
> show dbs
local   0.03125GB
lpn     0.0625GB
test    (empty)
testdb  0.0625GB
> db.lpn.insert({license_number: 3454, park_time: new Date(), floor_id: "4th"})
> db.lpn.insert({license_number: 3455, park_time: new Date(), floor_id: "4th"})
> db.lpn.insert({license_number: 3453, park_time: new Date(), floor_id: "3rd"})
> db.lpn.find()
{ "_id" : ObjectId("5733ec63ef3796d586274405"), "license_number" : 3454, "park_ime" : ISODate("2016-05-12T02:37:23.288Z"), "floor_id" : "4th" }
{ "_id" : ObjectId("5733ec6aef3796d586274406"), "license_number" : 3455, "park_ime" : ISODate("2016-05-12T02:37:30.085Z"), "floor_id" : "4th" }
{ "_id" : ObjectId("5733ec72ef3796d586274407"), "license_number" : 3453, "park_ime" : ISODate("2016-05-12T02:37:38.223Z"), "floor_id" : "3rd" }
> db.lpn.find( {license_number: 3453 } )
{ "_id" : ObjectId("5733ec72ef3796d586274407"), "license_number" : 3453, "park_time" : ISODate("2016-05-12T02:37:38.223Z"), "floor_id" : "3rd" }
> db.lpn.drop()
> db.lpn.createIndex( {"park_time": 1}, {expireAfterSeconds: 5 } )
> db.lpn.insert({license_number: 3455, park_time: new Date(), floor_id: "5th]"})
> db.lpn.find()
>
```


