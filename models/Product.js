const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: { type: String, oppercase: true , required: true},
  name: { type: String, lowercase: true , required: true},
  description: { type: String, required: true},
  price: Number,
  cal: Number,
  carotenoid: Number,
  vitamin_c: Number,
  folates: Number,
  potassium: Number,
  fiber: Number
}, { timestamps: true });

productSchema.statics = {

  load: function () {
    this.find()
        .populate('products')
        .exec(function (err, products) {
      if (err) {
        res.render('error', {
          status: 500
        });
      } else {
        console
            .log("Product Model : " + JSON.stringify(products));
        return products;
      }
    })

  }
};

/*

productSchema.statics = {
  load: function (id, cb) {
    this.find()
        .populate('products')
        .exec(res.send({products: products}));
  }
};
*/
/*
exports.getAllProducts = function(req, res) {
  productSchema.find()
      .exec(function (err, products) {
        if (err) {
          res.render('error', {
            status: 500
          });
        } else {
          console
              .log(JSON.stringify(products));
          res.send({products: products});
        }
      });
}
*/


//mongoose.model('Product', productSchema);

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
