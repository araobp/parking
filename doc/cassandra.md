###Schema
```
CREATE TABLE lpn.lpn (
    license_number int,
    park_time timestamp,
    floor_id text,
    PRIMARY KEY (license_number, park_time)
) WITH CLUSTERING ORDER BY (park_time DESC);
```

###Insert operation example
```
INSERT INTO lpn.lpn ( license_number , park_time , floor_id ) VALUES (3453, '2016-05-10 12:31:22', '3rd') USING TTL 20;
```

###cqlsh
```
pi@raspberrypi:~/apache-cassandra-3.4/bin $ ./cqlsh
Connected to Test Cluster at 127.0.0.1:9042.
[cqlsh 5.0.1 | Cassandra 3.4 | CQL spec 3.4.0 | Native protocol v4]
Use HELP for help.
cqlsh> use lpn;
cqlsh:lpn> select * from lpn;

 license_number | park_time                       | floor_id
----------------+---------------------------------+----------
           3454 | 2016-05-09 10:20:44.000000+0000 |      3rd
           3454 | 2016-05-08 03:10:28.000000+0000 |      5th
           3455 | 2016-05-11 11:10:32.000000+0000 |      4th
           3455 | 2016-05-08 10:23:55.000000+0000 |      3rd
           3453 | 2016-05-11 08:23:10.000000+0000 |      4th
           3453 | 2016-05-10 03:31:22.000000+0000 |      3rd
           3453 | 2016-05-09 06:41:19.000000+0000 |      5th

(7 rows)
```

