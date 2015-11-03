Twitch viewer (for broacasting)


Requirements:

Meteor
noVNC

Running:

    $ git clone https://github.com/jakozaur/noVNC.git 
    $ cd noVNC
    $ ./utils/launch.sh --vnc localhost:5900
    
    $ git clone https://github.com/n17r4m/twitch-viewer.git
    $ cd twitch-viewer
    $ meteor

Notes:

Meteor runs on port 3000
MongoDB runs on port 3001
noVNC runs on port 6080

Using:

There are some tweakable parameters near the top of twitch-viewer.js

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




