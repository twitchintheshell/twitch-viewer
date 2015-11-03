


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
	Template.bulletinboard.board = function(){
		return "This is the bulletin board"
	}
	
	T
	
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
