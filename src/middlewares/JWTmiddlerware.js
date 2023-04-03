var jwt = require("jsonwebtoken");

const getJWT = async ({ email,id }) => {
  return await jwt.sign({ email,id }, process.env.JWTKEY, {
    expiresIn: "24h",
  });
};

const validateJWT = async (req, res, next) => {
  try {
    const { email,id } = await jwt.verify(
      req.cookies["token"],
      process.env.JWTKEY
    );
    req.user = email;
    req.id = id;
    console.log(email,id)
    next();
  } catch (error) {
    return res.status(401).json({
      message: "not authorized",
    });
  }
};

module.exports = {
  getJWT,
  validateJWT,
};
