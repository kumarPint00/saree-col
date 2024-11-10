const { Product, Variant, Image, VariantSize, Price } = require("../models");
const { sequelize, Sequelize } = require("../models/index");

const { Op } = require("sequelize");

exports.create = async (req, res, next) => {
  let transaction;
  try {
    // Begin transaction
    transaction = await sequelize.transaction();
    // Extract product details from the request body
    const {
      name,
      description,
      fabricComposition,
      trims,
      sustainability,
      washCare,
      style,
      searchableText,
      variants,
    } = req.body;
    // Create the product entry
    const product = await Product.create(
      {
        name,
        description,
        fabricComposition,
        trims,
        sustainability,
        washCare,
        style,
        searchableText: String(name + " " + description).toLowerCase(),
      },
      { transaction },
    );
    // Iterate over variants and create entries in the database
    for (const variantData of variants) {
      const { colorId, discount, variantSizes, images } = variantData;
      // Create the variant entry
      const variant = await Variant.create(
        {
          productId: product.id,
          colorId,
          discount,
        },
        { transaction },
      );
      // Create variant sizes
      for (const sizeData of variantSizes) {
        await VariantSize.create(
          {
            variantId: variant.id,
            sizeId: sizeData.sizeId,
            quantity: sizeData.quantity,
            price: sizeData.price,
          },
          { transaction },
        );
      }
      // Upload images for the variant
      for (const imageData of images) {
        // Handle image upload (e.g., using Multer)
        // const imageUrl = await uploadImage(imageData);
        // Create image entry in the database
        await Image.create(
          {
            url: "imageUrl",
            principalType: "variantImage",
            principalId: variant.id,
            fileType: "jpeg/aasd",
            fieldName: "fieldName",
            blobName: "blobName",
            originalName: "originalName",
            mimeType: "mimeType",
            url: "url",
            etag: "etag",
            container: "container",
            encoding: "encoding",
            size: "size",
          },
          { transaction },
        );
      }
    }
    // Commit the transaction
    await transaction.commit();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    // Rollback the transaction if an error occurs
    if (transaction) await transaction.rollback();
    next(error);
  }
};
exports.findOne = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [
        {
          model: Variant,
          include: [{ model: VariantSize }, { model: Image }],
        },
      ],
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};
exports.findAll = async (req, res, next) => {
  try {
    const product = await Product.findAll({
      include: [
        {
          model: Variant,
          limit: 1,
          include: [{ model: Image }],
        },
      ],
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    // Pass the error to the next middleware (central error handler)
    next(err);
  }
};
exports.findRandom = async (req, res, next) => {
  try {
    const product = await Product.findAll(
      {
        include: [
          {
            model: Variant,
            limit: 1,
            include: [{ model: Image }],
          },
        ],
      },
      { order: "random()", limit: 5 },
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    // Pass the error to the next middleware (central error handler)
    next(err);
  }
};
exports.findAllBySearchQuery = async (req, res, next) => {
  try {
    const { searchQuery } = req.params;
    const product = await Product.findAll({
      where: { searchableText: { [Sequelize.Op.iLike]: `%${searchQuery}%` } },
      include: [
        {
          model: Variant,
          limit: 1,
          include: [{ model: Image }],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "No Products not found" });
    }
    res.json(product);
  } catch (err) {
    // Pass the error to the next middleware (central error handler)
    next(err);
  }
};
exports.findAllByFilter = async (req, res, next) => {
  try {
    const { colors, styles } = req.body;
    const whereClause = {};
    if (colors && colors.length > 0) {
      whereClause.colorId = { [Op.in]: colors };
    }
    if (styles && styles.length > 0) {
      whereClause.styleId = { [Op.in]: styles };
    }
    const variants =
      Object.keys(whereClause).length > 0
        ? await Variant.findAll({
            where: whereClause,
            include: [{ model: Image }],
          })
        : await Variant.findAll();

    // Extract product IDs from the fetched variants
    const productIds = variants.map((variant) => variant.productId);

    // Fetch products with associated images
    const products = await Product.findAll({
      where: { id: { [Op.in]: productIds } },
      include: [
        {
          model: Variant,
          limit: 1,
          include: [{ model: Image }],
        },
      ],
    });

    res.json(products);
  } catch (err) {
    // Pass the error to the next middleware (central error handler)
    next(err);
  }
};
exports.delete = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const t = await sequelize.transaction();
    try {
      const deletedRowCount = await Product.destroy({
        where: { id: productId },
        transaction: t,
      });
      if (deletedRowCount === 0) {
        res.status(200).json({ message: "Product deleted successfully" });
      }
      await t.commit();
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (err) {
    next(err);
  }
};
exports.deleteVariant = async (req, res, next) => {
  try {
    const { variantId } = req.params;
    const t = await sequelize.transaction();
    try {
      const deletedRowCount = await Variant.destroy({
        where: { id: variantId },
        transaction: t,
      });
      if (deletedRowCount === 0) {
        res.status(200).json({ message: "Variant deleted successfully" });
      }
      await t.commit();
      return res.status(200).json({ message: "Variant deleted successfully" });
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  try {
    const {
      id,
      name,
      description,
      fabricComposition,
      trims,
      sustainability,
      washCare,
      style,
    } = req.body;

    const t = await sequelize.transaction();
    try {
      // searchableText,
      const searchableText =
        name +
        " " +
        description +
        " " +
        fabricComposition +
        " " +
        trims +
        " " +
        sustainability +
        " " +
        washCare +
        " " +
        style;
      const updatedRowCount = await Product.update(
        {
          name,
          description,
          fabricComposition,
          trims,
          sustainability,
          washCare,
          style,
          searchableText,
        },
        {
          where: { id: id },
          transaction: t,
        },
      );
      if (updatedRowCount === 0) {
        res.status(200).json({ message: "Product updated successfully" });
      }
      await t.commit();
      return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (err) {
    next(err);
  }
};
exports.createVariant = async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();
    const {
      productId,
      colorId,
      styleId,
      discount,
      variantSizes,
      images,
      prices,
    } = req.body;
    const variant = await Variant.create(
      { productId, colorId, styleId, discount },
      { t },
    );
    if (variantSizes && variantSizes.length > 0) {
      await Promise.all(
        variantSizes.map(async (sizeData) => {
          await VariantSize.create(
            { variantId: variant.id, ...sizeData },
            { t },
          );
        }),
      );
    }
    if (images && images.length > 0) {
      await Promise.all(
        images.map(async (imageName) => {
          await Image.create(
            {
              principalType: "Variant",
              principalId: variant.id,
              originalName: imageName,
            },
            { t },
          );
        }),
      );
    }
    if (prices) {
      await Price.create({ variantId: variant.id, ...prices }, { t });
    }
    await t.commit();
    res.status(201).json({ message: "Variant created successfully", variant });
  } catch (err) {
    if (t) await t.rollback();
    next(err);
  }
};
exports.updateVariant = async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();
    const {
      id,
      productId,
      colorId,
      styleId,
      discount,
      variantSizes,
      images,
      prices,
    } = req.body;
    const variant = await Variant.findByPk(id);
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }
    await variant.update({ productId, colorId, styleId, discount }, { t });
    if (variantSizes && variantSizes.length > 0) {
      await Promise.all(
        variantSizes.map(async (sizeData) => {
          if (sizeData.id) {
            const size = await VariantSize.findByPk(sizeData.id);
            if (size) {
              await size.update(sizeData, { t });
            }
          } else {
            await VariantSize.create(
              { variantId: variant.id, ...sizeData },
              { t },
            );
          }
        }),
      );
    }
    if (images && images.length > 0) {
      await Promise.all(
        images.map(async (imageName) => {
          await Image.create(
            {
              principalType: "Variant",
              principalId: variant.id,
              originalName: imageName,
            },
            { t },
          );
        }),
      );
    }
    if (prices) {
      await Price.update(prices, {
        where: { variantId: variant.id },
        t,
      });
    }
    await t.commit();
    res.json({ message: "Variant updated successfully", variant });
  } catch (err) {
    if (t) await t.rollback();
    next(err);
  }
};
