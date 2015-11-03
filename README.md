Twitch viewer (for broacasting)
===============================

Requirements:
-------------

Meteor

noVNC

twitch-master

Running:
--------

    $ git clone https://github.com/jakozaur/noVNC.git 
    $ cd noVNC
    $ ./utils/launch.sh --vnc localhost:5900
    
    $ git clone https://github.com/twitchintheshell/twitch-viewer.git
    $ cd twitch-viewer
    $ meteor

Update configuration as needed in the tweakable parameters of twitch-viewer.js

Be sure to set the EXEC line to the correct path to twitch-master/init.sh

Notes:
------

Meteor runs on port 3000

MongoDB runs on port 3001

noVNC runs on port 6080

Using:
------

Data on screen is updated via modifying the mongo database

    $ cd twitch-viewer
    $ meteor mongo

There are 4 relevant collections

    board: {message: String}
    ticker: {message: String}
    ad: {url: String}
    commandlog: {message: String, time: Number}

Example, to update the bulletinboard:

    $ db.board.insert({message: "Important News Item!"})

Example, to update the ticker:

    $ db.ticker.insert({message: "Now in Monarchy Mode!"})

To add a new command log entry:

    $ db.commandlog.insert({message: "n17r4m: c", time: +new Date()})

To add a new ad image:

    $ db.add.insert({url: "http://twitchintheshell.com/img/pic1.png"})




