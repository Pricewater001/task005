const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllModel = async (req, res) => {
  try {
    const { Model } = prisma;

    const models = await Model.findMany({
      where: {
        userId: req.id,
      },
    });
    res.json({
      data: models,
    });
  } catch (error) {
    res
      .status(400)
      .send(`Error Something went wrong while geting ${error.message}`);
  }
};

const getOneModel = async (req, res) => {
  try {
    const { Model } = prisma;
    const { id } = req.params;
    if (!id) return res.status(400).send("no Id provided");
    const models = await Model.findMany({
      where: {
        id,
        userId: req.id,
      },
    });
    res.json({
      data: models,
    });
  } catch (error) {
    res
      .status(400)
      .send(`Error Something went wrong while geting ${error.message}`);
  }
};

const putModel = async (req, res) => {
  try {
    const { Model } = prisma;
    const data = req.body;
    const { id } = req.params;
    if (!id) return res.status(400).send("no Id provided");
    if (!data) return res.status(400).send("no data provided");

    const updateUser = await Model.update({
      where: {
        id,
      },
      data: {
        text: data.text,
      },
    });
    if (req.id != updateUser.userId)
      return res.status(401).send("not authorized to update this model ");
    res.json({
      data: updateUser,
    });
  } catch (error) {
    res
      .status(400)
      .send(`Error Something went wrong while updating ${error.message}`);
  }
};

const deleteModel = async (req, res) => {
  try {
    const { Model } = prisma;
    const { id } = req.params;
    if (!id) return res.status(400).send("no Id provided");

    const model = await Model.findUnique({
      where: {
        id,
      },
    });
    if (!model) return res.status(404).send("there is node mode with this id");

    if (req.id != model.userId)
      return res.status(401).send("not authorized to update this model ");

    const deleted = await Model.delete({
      where: {
        id,
      },
    });

    res.json({
      data: deleted,
    });
  } catch (error) {
    res
      .status(400)
      .send(`Error Something went wrong while Deleting ${error.message}`);
  }
};

const postModel = async (req, res) => {
  try {
    const { Model } = prisma;
    const data = req.body;
    if (!data) return res.status(400).send("no data provided");
    const post = await Model.create({
      data: {
        text: data.text,
        user: {
          connect: {
            id: req.id,
          },
        },
      },
    });

    res.json({
      data: post,
    });
  } catch (error) {
    res
      .status(400)
      .send(`Error Something went wrong while adding ${error.message}`);
  }
};

module.exports = {
  postModel,
  deleteModel,
  putModel,
  getAllModel,
  getOneModel,
};
