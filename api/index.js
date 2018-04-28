const express = require('express');
const app = express();

require('./routes/routes')(app);

app.listen(3000, () => console.log('Coaich backend listening on port 3000!'))