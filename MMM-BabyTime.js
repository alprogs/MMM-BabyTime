Module.register("MMM-BabyTime", {
	// defualt module config 
	defaults: {
		updateInterval: 1, // UNIT: minutes
	},

	// define sstart sequence 
	start: function() {
		Log.info("Starting module: "+ this.name);

		this.loaded 	= false;
		this.lastFeedingTime	= "";
		this.lastFeedingAmount 	= "";
		this.todayTotalAmount 	= "";

		this.update();
		setInterval(
			this.update.bind( this ),
			this.config.updateInterval * 60 * 1000
		);
	},

	update: function() {
		this.sendSocketNotification("REQUEST", this.config);
	},

	// Override dom generator
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "bright light big";

		if (!this.loaded) {
			wrapper.innerHTML = "Loading ...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var lastFeedingTime 		= document.createElement("div");
		lastFeedingTime.innerHTML 	= "마지막 수유: "+ this.lastFeedingTime;
		lastFeedingTime.className 	+= "babytimeInfo";
		wrapper.appendChild( lastFeedingTime );

		var lastFeedingAmount 		= document.createElement("div");
		lastFeedingAmount.innerHTML = "마지막 수유: "+ this.lastFeedingAmount;
		lastFeedingAmount.className += "babytimeInfo";
		wrapper.appendChild( lastFeedingAmount );

		var todayTotalAmount 		= document.createElement("div");
		todayTotalAmount.innerHTML 	= "금일 수유량: "+ this.todayTotalAmount;
		todayTotalAmount.className 	+= "babytimeInfo";
		wrapper.appendChild( todayTotalAmount );

		return wrapper;
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'DATA') {
			this.lastFeedingTime 	= payload.lastFeedingTime;
			this.lastFeedingAmount 	= payload.lastFeedingAmount;
			this.todayTotalAmount	= payload.todayTotalAmount;

			this.loaded = true;
			this.updateDom();
		}
	},
});

