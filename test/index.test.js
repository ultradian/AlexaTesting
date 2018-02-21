const vax = require("virtual-alexa");
const alexa = vax.VirtualAlexa.Builder()
    .handler("../src/index.handler") // Lambda function file and name
    .interactionModelFile("./model.json")
    .applicationID("amzn1.ask.skill.[unique-value-here]")
    .create();

describe("Test category", function() {

        test("Launches successfully", (done) => {
            alexa.utter("get started").then((payload) => {
                expect(payload.response.outputSpeech.ssml).toContain("Welcome");
                return alexa.utter("");
            });
            });
        });
