if (typeof RFB !== "undefined"){
	console.info("RFB", RFB);
	RFB._rfb_port = 5901;
} else {
	console.info("no RFB")
}

if (typeof rfb !== "undefined"){
	console.info("rfb", rfb);
	rfb._rfb_port = 5901;
}  else {
	console.info("no rfb")
}


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
