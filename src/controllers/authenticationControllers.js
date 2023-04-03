const { PrismaClient } = require("@prisma/client");
const { DB_POST_ONE, DB_GET_ONE } = require("../services/DB/Queries");
const prisma = new PrismaClient();
var bcrypt = require("bcryptjs");
const { getJWT } = require("../middlewares/JWTmiddlerware");

const signup = async (req, res) => {
  try {
    const { User } = prisma;
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("no data provided");
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    console.log(hash);
    const data = {
      email,
      password: hash,
    };
    const user = await DB_POST_ONE(User, data);
    const token = await getJWT(user);
    res.cookie("token", token);

    res.status(200).json({
      message :"Done💯",
    });
  } catch (error) {
    res
      .status(400)
      .send(`Error Something went wrong while adding ${error.message}`);
  }
};

const login = async (req, res) => {
  try {
    const { User } = prisma;
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("no data provided");
    const user = await User.findUnique({
      where: {
        email,
      },
    });
    if (!user) return res.status(404).send(`there is no user`);

    const isCorrect = bcrypt.compareSync(password, user.password);

    if (!isCorrect)
      return res.status(401).send(`email or password is incorrect`);

    const token = await getJWT(user);
    res.cookie("token", token);
    res.status(200).json({
      message :"Done💯",
    });
  } catch (error) {
    res
      .status(400)
      .send(`Error Something went wrong while adding ${error.message}`);
  }
};
module.exports = {
  signup,
  login,
};
