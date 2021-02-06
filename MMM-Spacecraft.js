/* Magic Mirror
 * Module: MMM-Spacecraft
 *
 * By Mykle1
 *
 */
Module.register("MMM-Spacecraft", {

    // Module config defaults.
    defaults: {
        showPix: "Yes", // No = no pictures display
        showDescription: "Yes", // Yes for full descriptive text under picture
      //  words: 30, // Amount of words you want shown in description
        useHeader: true, // false if you don't want a header
        header: "We have liftoff!", // Any text you want
        maxWidth: "350px",
        rotateInterval: 30 * 1000, // 30 seconds
        animationSpeed: 3000, // fade in and out speed
        initialLoadDelay: 5250,
        retryDelay: 2500,
        updateInterval: 60 * 60 * 1000,
    },

    getStyles: function() {
        return ["MMM-Spacecraft.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        this.Spacecraft = [];
        this.activeItem = 0;
        this.rotateInterval = null;
        this.scheduleUpdate();
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "T - Minus 5 seconds and counting";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        // Rotate thru data
        var Keys = Object.keys(this.Spacecraft);
        if (Keys.length > 0) {
            if (this.activeItem >= Keys.length) {
                this.activeItem = 0;
            }
            var Spacecraft = this.Spacecraft[Keys[this.activeItem]];


            var top = document.createElement("div");
            top.classList.add("list-row");

            // spacecraft
            var spacecraft = document.createElement("div");
            spacecraft.classList.add("xsmall", "bright", "spacecraft");
            spacecraft.innerHTML = Spacecraft.name + " by " + Spacecraft.agency.abbrev + ". " + Spacecraft.capability + ". " + " Maiden flight was " + Spacecraft.maiden_flight + ". " + "Crew capacity is " + Spacecraft.crew_capacity;
            wrapper.appendChild(spacecraft);

            var showPix = this.config.showPix
            // picture of spacecraft
            var img = document.createElement("img");
            img.classList.add("photo");
            // config option for pictures
            if (this.config.showPix == "Yes") {
                img.src = Spacecraft.image_url;
                wrapper.appendChild(img);
            }

            function trimByWord(sentence) {
                var result = Spacecraft.agency.description;
                var resultArray = result.split(" ");
                if (resultArray.length > 30) {  // <-- MAKE THIS A CONFIG OPTION
                    resultArray = resultArray.slice(0, 30);
                    result = resultArray.join(" ") + "…";
                }
                return result;
            }


            var showDescription = this.config.showDescription
            // description of mission
            var description = document.createElement("div");
            description.classList.add("xsmall", "bright", "description");
            // config option for description
            if (this.config.showDescription == "Yes") {
                description.innerHTML = trimByWord();
                wrapper.appendChild(description);
            }
        }

        return wrapper;
    },


    processSpacecraft: function(data) {
        this.Spacecraft = data;
        this.loaded = true;
        console.log(this.Spacecraft); // checking my data
    },



    sTrim: function(str, length, delim, appendix) {
        if (str.length <= length) return str;
        var trimmedStr = str.substr(0, length + delim.length);
        var lastDelimIndex = trimmedStr.lastIndexOf(delim);
        if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);
        if (trimmedStr) trimmedStr += appendix;
        return trimmedStr;
    },

    scheduleCarousel: function() {
        console.log("Carousel of Spacecraft fucktion!");
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getSpacecraft();
        }, this.config.updateInterval);
        this.getSpacecraft(this.config.initialLoadDelay);
        var self = this;
    },

    getSpacecraft: function() {
        this.sendSocketNotification('GET_SPACECRAFT');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "SPACECRAFT_RESULT") {
            this.processSpacecraft(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
