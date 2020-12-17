if('serviceWorker' in navigator){
	navigator.serviceWorker
		.register("/sw.js")
		.then(function(){
			console.log("Service worker is registered!")
		})
}

function displayFirstNotification(){
	$("#btnEnableNotifications").hide();


	var options = {
		body: "You are successfully subscribed to our notifications! Thank you very much!",
		icon: "/images/icons/app_icon48x48.png",
		// Star Wars shamelessly taken from Peter Beverloo
      	// https://tests.peter.sh/notification-generator/
		vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]
		
	}

	navigator.serviceWorker.ready.then(function(registration){
		registration.showNotification("Successfully subscribed!!", options)
	})
}

function askForNotificationPermission(){
	Notification.requestPermission(function(result){
		console.log("user Choice", result);
		if(result != "granted"){
			console.log("No permission granted");
		} else {
			console.log("Permission granted!!!");
			displayFirstNotification();
		}

	})
}


$(function(){
	
	if('Notification' in window){
		$("#btnEnableNotifications").show();
		$("#btnEnableNotifications").click(askForNotificationPermission);
	}
	
})