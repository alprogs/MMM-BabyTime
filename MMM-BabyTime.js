Module.register("MMM-BabyTime", {
	// defualt module config 
	defaults: {
		updateInterval: 1, // UNIT: seconds
	},

	// style
	getStyles: function() {
		return ['modules/MMM-BabyTime/css/MMM-BabyTime.css'];
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
			this.config.updateInterval * 1000
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
			wrapper.className = "bright light medium";
			return wrapper;
		}

		var lastFeedingIcon1 		= document.createElement('img');
		lastFeedingIcon1.setAttribute('height', '70');
		lastFeedingIcon1.setAttribute('width', '70');
		lastFeedingIcon1.className 	+= "MMM-BabyTime_ICON";
		lastFeedingIcon1.src = './modules/MMM-BabyTime/images/'+ (this.lastFeedingAmount.startsWith("분유") ? "dry.png" : "weaning.png");
		
		var lastFeedingTime 		= document.createElement("div");
		lastFeedingTime.innerHTML 	= " "+ this.lastFeedingTime;
		lastFeedingTime.className 	+= "MMM-BabyTime_BIG_TEXT";

		var lastFeedingTimeDiv 		= document.createElement("div");
		lastFeedingTimeDiv.className 	+= "MMM-BabyTime_ROW";
		lastFeedingTimeDiv.appendChild( lastFeedingIcon1 );
		lastFeedingTimeDiv.appendChild( lastFeedingTime );
		
		wrapper.appendChild( lastFeedingTimeDiv );

		var lastFeedingIcon2 		= document.createElement('img');
		lastFeedingIcon2.setAttribute('height', '70');
		lastFeedingIcon2.setAttribute('width', '70');
		lastFeedingIcon2.className 	+= "MMM-BabyTime_ICON";
		lastFeedingIcon2.src = './modules/MMM-BabyTime/images/'+ (this.lastFeedingAmount.startsWith("분유") ? "dry.png" : "weaning.png");

		var lastFeedingAmount 		= document.createElement("div");
		lastFeedingAmount.innerHTML = " "+ this.lastFeedingAmount;
		lastFeedingAmount.className += "MMM-BabyTime_BIG_TEXT";

		var lastFeedingAmountDiv 	= document.createElement("div");
		lastFeedingAmountDiv.className 	+= "MMM-BabyTime_ROW";
		lastFeedingAmountDiv.appendChild( lastFeedingIcon2 );
		lastFeedingAmountDiv.appendChild( lastFeedingAmount );

		wrapper.appendChild( lastFeedingAmountDiv );

		var todayTotalDiv 			= document.createElement("div");
		todayTotalDiv.className 	+= "MMM-BabyTime_TODAY_DIV";

		var todayTotalText 		= document.createElement("div");
		todayTotalText.innerHTML 	= "오늘&nbsp;";
		todayTotalText.className 	+= "MMM-BabyTime_TODAY ";
		todayTotalText.className 	+= "MMM-BabyTime_TODAY_TEXT";
		todayTotalDiv.appendChild( todayTotalText );

		var todayTotalFeeding 		= document.createElement("div");
		todayTotalFeeding.innerHTML 	= this.todayTotalFeeding+"ml";
		todayTotalFeeding.className 	+= "MMM-BabyTime_TODAY ";
		todayTotalFeeding.className 	+= "MMM-BabyTime_TODAY_TOTAL";
		todayTotalDiv.appendChild( todayTotalFeeding );

		var todayTotalTextLp 		= document.createElement("div");
		todayTotalTextLp.innerHTML 	= "(";
		todayTotalTextLp.className 	+= "MMM-BabyTime_TODAY ";
		todayTotalTextLp.className 	+= "MMM-BabyTime_TODAY_TEXT";
		todayTotalDiv.appendChild( todayTotalTextLp );

		var todayTotalDriedMilk 		= document.createElement("div");
		todayTotalDriedMilk.innerHTML 	= this.todayTotalDriedMilk;
		todayTotalDriedMilk.className 	+= "MMM-BabyTime_TODAY ";
		todayTotalDriedMilk.className 	+= "MMM-BabyTime_TODAY_TOTAL_DRIED_MILK";
		todayTotalDiv.appendChild( todayTotalDriedMilk );

		var todayTotalTextPlus 		= document.createElement("div");
		todayTotalTextPlus.innerHTML 	= "+";
		todayTotalTextPlus.className 	+= "MMM-BabyTime_TODAY ";
		todayTotalTextPlus.className 	+= "MMM-BabyTime_TODAY_TEXT";
		todayTotalDiv.appendChild( todayTotalTextPlus );

		var todayTotalWeaning 		= document.createElement("div");
		todayTotalWeaning.innerHTML 	= this.todayTotalWeaning;
		todayTotalWeaning.className 	+= "MMM-BabyTime_TODAY ";
		todayTotalWeaning.className 	+= "MMM-BabyTime_TODAY_TOTAL_WEANING";
		todayTotalDiv.appendChild( todayTotalWeaning );

		var todayTotalTextRp 		= document.createElement("div");
		todayTotalTextRp.innerHTML 	= ")";
		todayTotalTextRp.className 	+= "MMM-BabyTime_TODAY ";
		todayTotalTextRp.className 	+= "MMM-BabyTime_TODAY_TEXT";
		todayTotalDiv.appendChild( todayTotalTextRp );

		wrapper.appendChild( todayTotalDiv );

		return wrapper;
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'DATA') {
			this.lastFeedingTime 	= payload.lastFeedingTime;
			this.lastFeedingAmount 	= payload.lastFeedingAmount;
			this.todayTotalFeeding	= payload.todayTotalFeeding;
			this.todayTotalDriedMilk	= payload.todayTotalDriedMilk;
			this.todayTotalWeaning		= payload.todayTotalWeaning;

			this.loaded = true;
			this.updateDom();
		}
	},
});

