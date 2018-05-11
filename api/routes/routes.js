const Tone = require('../watson/tone');
const bodyParser = require('body-parser');

module.exports = (app) => {

    app.use(bodyParser());

    app.get('/', (req, res) => res.send('This is the coaich backend!'))

    app.post('/tone', (req, res) => {
        if (!req || !req.body || !req.body.text) {
            return res.send('No text received. Please use the following JSON format: {"text" : "this is example text"}');
        }

// CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Content-type,Accept,X-Custom-Header");


        new Tone().analyze(req.body.text).then(tone => {
            return res.send(tone);
        });
    });
    
}
