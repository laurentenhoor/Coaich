const Tone = require('../watson/tone');
const bodyParser = require('body-parser');

module.exports = (app) => {

    app.use(bodyParser());

    app.use((req, res, next) => {
        addCorsHeaders(res);
        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }
        return next();
    });

    app.get('/', (req, res) => res.send('This is the coaich backend!'))

    app.post('/tone', (req, res) => {
        if (!req || !req.body || !req.body.text) {
            return res.send('No text received. Please use the following JSON format: {"text" : "this is example text"}');
        }
        addCorsHeaders(res);

        new Tone().analyze(req.body.text).then(tone => {
            return res.send(tone);
        });
    });

}

function addCorsHeaders(res) {
     // CORS headers
     res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
     // Set custom headers for CORS
     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Content-type,Accept");
}