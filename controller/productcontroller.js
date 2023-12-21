const { Product, Categoriey } = require("../config/db");
const path = require("path");
const fs = require("fs");
exports.getallProduct = async (req, res) => {
  const product = await Product.findAll();
  const message = await req.flash("message");
  const messagedel = await req.flash("massageDel");
  res.render("products", {
    products: product,
    messages: message,
    messageDel: messagedel,
  });
};

exports.getProduct = async (req, res) => {
  const categoriey = await Categoriey.findAll();
  res.render("addproduct", { categorieys: categoriey });
};
exports.postAddProduct = async (req, res) => {
  try {
    const c_id = req.body.c_id;
    const title = req.body.title;
    const price = req.body.price;
    const qty = req.body.qty;
    const description = req.body.description;
    const imageUrl = req.file.filename;
    const user_id = req.user.id;
    const product = new Product({
      c_id: c_id,
      title: title,
      price: price,
      qty: qty,
      description: description,
      imageUrl: imageUrl,
      user_id: user_id,
    });

    await product.save();
    req.flash("message", "Product Add successfully Done..");
    res.redirect("/admin/products");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDeleteProd = async (req, res) => {
  try {
    const id = req.params.id;

    const productDel = await Product.destroy({ where: { id } });
    fs.unlinkSync = path.join(
      __dirname,
      `../public/prodimage/${productDel.imageUrl}`
    );
    if (productDel) {
      req.flash("massageDel", "Product Delete Success...");
      res.redirect("/admin/products");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getEditUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ where: { id } });
    res.render("editProduct", { products: product });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditProduct = async (req, res) => {
  try {
    // const id = req.body.id;
    // const updateProduct = {
    //   title: req.body.title,
    //   price: req.body.price,
    //   qty: req.body.qty,
    //   description: req.body.description,
    // };

    // const newProduct = await Product.update(updateProduct, { where: { id } });

    const { title, price, qty, description, imageUrl, c_id } = req.body;
    const id = req.body.id;
    const product = await Product.update(
      {
        c_id: c_id,
        title: title,
        price: price,
        qty: qty,
        description: description,
        imageUrl: imageUrl,
      },
      { where: { id } }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found.",
      });
    }

    // if (!req.hrx) {
    // }
    res.redirect("/admin/products");
    // return res.status(200).json({
    //   success: true,
    //   message: "Product Update Successfully Done...",
    //   data: newProduct,
    // });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//>>>>>>>>>>>>>>>>>>>>>>> Categories >>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.getcategories = async (req, res) => {
  const categoriey = await Categoriey.findAll();
  res.render("addcategories", {
    categorieys: categoriey,
  });
};

exports.postcategories = async (req, res) => {
  try {
    const catname = req.body.catname;

    const catagoriey = new Categoriey({
      catname: catname,
    });

    await catagoriey.save();
    req.flash("Categoriey Add Successfully Done...");
    res.redirect("/admin/addcategories");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDeleteCategories = async (req, res) => {
  try {
    const id = req.params.id;
    const categoriey = await Categoriey.destroy({ where: { id } });

    if (categoriey) {
      res.redirect("/admin/addcategories");
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUpdateCategories = async (req, res) => {
  try {
    const id = req.params.id;
    const categoriey = await Categoriey.findOne({ where: { id } });

    res.render("editCategoriey", { categorieys: categoriey });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.postCategories = async (req, res) => {
  try {
    const { catname } = req.body;
    const id = req.body.id;
    const categoriey = await Categoriey.update(
      {
        catname: catname,
      },
      { where: { id } }
    );

    if (!categoriey) {
      return res.status(404).json({
        success: false,
        message: "Categoriey Not Found",
      });
    }

    res.redirect("/admin/addcategories");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
