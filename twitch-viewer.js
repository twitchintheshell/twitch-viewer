
var Board = new Meteor.Collection("board");
var Ticker = new Meteor.Collection("ticker");
var CommandLog = new Meteor.Collection("commandlog");
var Ad = new Meteor.Collection("ad");

if (Meteor.isClient) {
	
	var AD_CHANGE_TIME = 30000;
	var GARBAGE_TIME = 90000;
	
	window.Board = Board;
	window.Ticker = Ticker;
	window.CommandLog = CommandLog;
	window.Ad = Ad;
	
	
	Template.bulletinboard.helpers({
		item: function(){ return Board.find() }
	})
	
	
	Template.ticker.onRendered(function(){
		setTimeout(function(){
			$("#ticker marquee").marquee()
		}, 1000)
	})
	
	
	Template.ticker.helpers({
		item: function(){ return Ticker.find() }
	})
	
	
	Template.commandlog.helpers({
		item: function(){ return CommandLog.find({}, {sort: {time: -1}}) }
	})
	
	Meteor.setInterval(function(){
		CommandLog.find({time: {$lt: +new Date() - GARBAGE_TIME}}).forEach(function(old){
			CommandLog.remove(old._id);
		})
	}, 2000)
	
	
	Template.ad.onRendered(function(){
		Meteor.setTimeout(function(){
			Session.set("ad_url", rand_ad())
		}, 1000);
	})
	Template.ad.helpers({
		ad_url: function(){ return Session.get("ad_url")}
	})
	
	function rand_ad(){
		var array = Ad.find().fetch();
		if (array.length > 0){
			var randomIndex = Math.floor( Math.random() * array.length );
			return array[randomIndex].url;
		} else return "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";
	}
	
	Meteor.setInterval(function(){
		Session.set("ad_url", rand_ad())
	}, AD_CHANGE_TIME)
	
	
	Template.clock.helpers({
		time: function(){ return Session.get("time") }
	})
	
	Meteor.setInterval(function(){
		Session.set("time", moment().format("MMMM Do, h:mm:ss a"));
	},1000)
	
}


if (Meteor.isServer){
	var EXEC = "/path/to/twitch-master/init.sh";
	var EARG = ["client_status"];
	
	Meteor.startup(function () {

		var require = Npm.require;
		var spawn = require('child_process').spawn;
		var status = spawn(EXEC, EARG);
	
		status.stdout.on('data', Meteor.bindEnvironment(function(data){
			CommandLog.insert({
				message: data.toString().replace("Winning command ", ""),
				time: +new Date()
			})
		}));

		status.stderr.on('data', Meteor.bindEnvironment(function(data){
			console.log('stderr: ' + data.toString());
		}));

	});
}

