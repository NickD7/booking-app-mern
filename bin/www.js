const app = require('../server/server');

const port = process.env.PORT || 8000;

app.listen(port, function() {
 console.log('running at localhost: ' + port);
});