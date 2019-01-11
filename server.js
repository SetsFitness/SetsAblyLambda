var Ably = require('ably');
var realtime = new Ably.Realtime({ key: "RP1cGg.4C1fZA:eIFzJY6tq4QTi0uI" });

exports.handler = async (event, context, callback) => {
    console.log(JSON.stringify(event));
    
    // Initialize all the variables that the request can have
    const channels = {};
    const messages = event.messages;
    if (messages) {
        const numMessages = messages.length;
        for (let i = 0; i < numMessages; i++) {
            const message = messages[i];

            // We need to know the token and the payload
            const channel = message.channel;
            const type = message.type;
            const payload = message.payload;
            if (channel && payload) {
                let ablyChannel = channels[channel];
                if (!ablyChannel) {
                    ablyChannel = realtime.channels.get(channel);
                    channels[channel] = ablyChannel;
                }
                ablyChannel.publish(type, payload);
                console.log("Successfully published message to channel = " + channel + ", with message type = " + type + ", and payload = " + JSON.stringify(payload));
            }
            else {
                callback(new Error("Every message must have a channel and payload! Message = " + JSON.stringify(message)));
            }
        }
    }
};

