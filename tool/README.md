#Device management tools

##"update_url" command

This command updates AWS IoT Thing Shadows (desired state) belonging to a specific garage ID.

Each thing must have the following attributes:

|attribute |value           |
|----------|----------------|
|garage_id |\<garage_id\>   |
|model     |raspberry-pi-3-b|
|type      |alpr            |

Usage:
```
./update_url <garage_id> <shortend_url>
```

Example:
```
./update_url 32 http://goo.gl/xxxxxx
```
