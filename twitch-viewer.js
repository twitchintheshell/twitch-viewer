
var Board = new Meteor.Collection("board");
var Ticker = new Meteor.Collection("ticker");
var CommandLog = new Meteor.Collection("commandlog");
var Ad = new Meteor.Collection("ad");

if (Meteor.isClient) {
	
	var AD_CHANGE_TIME = 30000;
	
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
		item: function(){ return CommandLog.find() }
	})
	
	
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

if (Meteor.isServer) {
	Meteor.startup(function () {
		// nop
	});
}
