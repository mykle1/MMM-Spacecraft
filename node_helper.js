/* Magic Mirror
 * Module: MMM-Spacecraft
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getSpacecraft: function(url) {
        request({
            url: "https://ll.thespacedevs.com/2.0.0/config/spacecraft/?format=json&limit=100",
            method: 'GET',
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body).results; // Parsing
				          //console.log(response.statusCode + result); // checking data
                    this.sendSocketNotification('SPACECRAFT_RESULT', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_SPACECRAFT') {
            this.getSpacecraft(payload);
        }
    }
});
