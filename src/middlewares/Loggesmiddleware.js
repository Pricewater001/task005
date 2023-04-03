const Loggers = require("../config/logsSchema");

const setLogges = async (req, res, next) => {
  const logs = await Loggers.create({
    userId: req.id,
    email: req.email,
    time: new Date(),
    method: req.method,
    host: req.host,
  });

  console.log(logs);
  next();
};
module.exports = {
  setLogges,
};
