const Tone = require('./watson/tone');
const bodyParser = require('body-parser');

module.exports = (app) => {

    app.use(bodyParser());
    app.get('/', (req, res) => res.send('Hello World!'))

    app.post('/tone', (req, res) => {
        console.log('tone request', req.body);
        new Tone().analyze(req.body.text).then(tone => {
            res.send(tone)
        });
    });

}