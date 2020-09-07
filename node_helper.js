'use strict';

/* Magic Mirror
 * Module: MMM-BabyTime
 *
 * By Brad Kim
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const exec = require('child_process').exec;

module.exports = NodeHelper.create({
	start: function () {
		console.log('[MMM-BabyTime] BabyTime helper started ...');
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		const self = this;
		if (notification === 'REQUEST') {
			const self = this
			this.config = payload

			// execute external babyTimeHelper.jar
			exec("java -jar ./modules/MMM-BabyTime/babyTimeHelper.jar", (error, stdout) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return;
				}

				console.log('[MMM-BabyTime] ext.tool log: '+ stdout);
				var arr = stdout.split(",");


				self.sendSocketNotification('DATA', {
					lastFeedingTime 	: arr[0],
					lastFeedingAmount 	: arr[1],
					todayTotalFeeding 	: arr[2],
					todayTotalDriedMilk	: arr[3],
					todayTotalWeaning	: arr[4],
				});
			});
		}
	}
});

