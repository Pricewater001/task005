const express = require('express');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const models = require('./Routes/modelRoutes');
const auth = require('./Routes/authenticationRoutes');
const logs = require('./Routes/logsRoutes');
const cookieParser = require('cookie-parser')


const app = express();
require("./config/monoDB")();


app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({
    message: 'Home',
  });
});

app.use('/model',models);
app.use('/auth', auth);
app.use('/logs', logs);

function start(port) {
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
}

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = {
  start,
};
