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
./update_url -g <garage_id> -u <shortened_url>
```

Example:
```
./update_url -g 32 -u http://goo.gl/xxxxxx
```
