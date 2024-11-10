const {
  LookBook,
  LookBookProducts,
  Image,
  VariantSize,
  Variant,
  sequelize,
  Sequelize,
  Product,
} = require("../models");

exports.create = async (req, res, next) => {
  console.log(req.body);
  const { name, description, showInHomePage, products } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const newLookBook = await LookBook.create(
      {
        name,
        description,
        showInHomePage,
        searchableText: name,
      },
      { transaction },
    );
    for (const productId of products) {
      await LookBookProducts.create(
        {
          lookBookId: newLookBook.id,
          productId,
        },
        { transaction },
      );
    }
    const images = req.files; // Uploaded files are available in req.files array
    console.log(images);
    for (const imageData of images) {
      await Image.create(
        {
          principalType: "lookBookImage",
          principalId: newLookBook.id,
          fileType: imageData.mimetype,
          fieldName: imageData.fieldName,
          blobName: imageData.filename,
          originalName: imageData.originalName,
          mimeType: imageData.mimetype,
          url: imageData.path,
          encoding: imageData.encoding,
          size: imageData.size,
        },
        { transaction },
      );
    }
    await transaction.commit();
    res.status(201).json(newLookBook);
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to add LookBook and associated products" });
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const lookBook = await LookBook.findByPk(id, {
      include: [
        {
          model: LookBookProducts,
          as: "bookProducts",
          include: [
            {
              model: Product,
              as: "product",
              include: [
                {
                  model: Variant,
                  include: [{ model: VariantSize }, { model: Image }],
                },
              ],
            },
          ],
        },
        {
          model: Image,
        },
      ],
    });
    if (!lookBook) {
      return res.status(404).json({ error: "LookBook not found" });
    }
    res.status(200).json({ lookBook });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch LookBook and associated products" });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const allLookBooks = await LookBook.findAll({
      include: [
        {
          model: LookBookProducts,
          as: "bookProducts",
          include: [
            {
              model: Product,
              as: "product",
              include: [
                {
                  model: Variant,
                  include: [{ model: VariantSize }, { model: Image }],
                },
              ],
            },
          ],
        },
        {
          model: Image,
        },
      ],
    });
    res.status(200).json(allLookBooks);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch LookBooks and associated products" });
  }
};

exports.getHomePageLookBooks = async (req, res, next) => {
  try {
    const homePageLookBooks = await LookBook.findAll({
      where: { showInHomePage: true },
      include: [
        {
          model: Image,
        },
      ],
    });
    res.status(200).json(homePageLookBooks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Failed to fetch home page LookBooks and associated products",
    });
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const transaction = await sequelize.transaction();
    await LookBookProducts.destroy(
      { where: { lookBookId: id } },
      { transaction },
    );
    await Image.destroy({ where: { principalId: id } }, { transaction });
    await LookBook.destroy({ where: { id } }, { transaction });
    await transaction.commit();
    res.status(204).end();
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to delete LookBook and associated products" });
  }
};

exports.update = async (req, res, next) => {
  const { id, name, description, showInHomePage, searchableText, products } =
    req.body;
  console.log("req.body :", req.body, "req.params :", req.params);
  const transaction = await sequelize.transaction();
  try {
    await LookBook.update(
      {
        name,
        description,
        showInHomePage,
        searchableText,
      },
      { where: { id }, transaction },
    );
    await LookBookProducts.destroy(
      { where: { lookBookId: id } },
      { transaction },
    );
    for (const productId of products) {
      await LookBookProducts.create(
        {
          lookBookId: id,
          productId,
        },
        { transaction },
      );
    }
    await Image.destroy({ where: { principalId: id } }, { transaction });
    for (const imageData of req.files) {
      await Image.create(
        {
          principalType: "lookBookImage",
          principalId: id,
          fileType: imageData.mimetype,
          fieldName: imageData.fieldName,
          blobName: imageData.filename,
          originalName: imageData.originalName,
          mimeType: imageData.mimetype,
          url: imageData.path,
          encoding: imageData.encoding,
          size: imageData.size,
        },
        { transaction },
      );
    }
    await transaction.commit();
    res.status(200).json({
      message: "LookBook and associated products updated successfully",
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to update LookBook and associated products" });
  }
};
