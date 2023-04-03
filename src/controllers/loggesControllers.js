const Loggers = require("../config/logsSchema");

const getLogges = async (req, res) => {
    let {page , size} = req.query;
    if(!page)
    page = 1;
    if(!size)
    size = 10;

    const limit  = +size;
    const skip = (page -1 ) * size;


  const logges = await Loggers.find().where({ userId: req.id }).limit(limit).skip(skip)
  res.status(200).send(logges);
};
module.exports = {
  getLogges,
};
