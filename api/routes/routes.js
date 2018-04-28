const Tone = require('../watson/tone');
const bodyParser = require('body-parser');

module.exports = (app) => {

    app.use(bodyParser());
    
    app.get('/', (req, res) => res.send('Hello World!'))

    app.post('/tone', (req, res) => {
        if (!req || !(req.body) || !(req.body.text)) {
            return res.send('No text received. Please use the following JSON format: {"text" : "this is example text"}');
        }
        new Tone().analyze(req.body.text).then(tone => {
            return res.send(tone);
        });
    });

}