"use strict";
const Alexa = require("alexa-sdk");

//=============================================================================
const APP_ID = "amzn1.ask.skill.[unique-value-here]";

const HELP_MESSAGE = "You can ask for help.";
const HELP_REPROMPT = "Ask for help.";
const STOP_MESSAGE = "Goodbye!";

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    "LaunchRequest" : function() {
        console.log("DEBUG: start LaunchRequest");
        this.attributes.speechOutput = "Welcome to the test program.";
        this.response.speak(this.attributes.speechOutput);
        this.emit(':responseReady');
    },
    "AMAZON.HelpIntent": function() {
        this.attributes.speechOutput = HELP_MESSAGE;
        this.attributes.repromptSpeech = HELP_REPROMPT;
        this.response.speak(this.attributes.speechOutput)
            .listen(this.attributes.repromptSpeech);
        this.emit(":responseReady");
    },
    "AMAZON.RepeatIntent": function() {
        this.response.speak(this.attributes.speechOutput)
            .listen(this.attributes.repromptSpeech);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.emit("EndSession");
    },
    "AMAZON.StopIntent": function() {
        this.emit("EndSession");
    },
    "EndSession": function() {
        this.response.speak(STOP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.attributes.speechOutput = "No intent match.";
        this.attributes.repromptSpeech = "Try again";
        this.response.speak(this.attributes.speechOutput)
            .listen(this.attributes.repromptSpeech);
        this.emit(":responseReady");
    },
};
