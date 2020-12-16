/**
 * FileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    uploadImage: function (req, res) {
        req.file('image').upload({
            adapter: require('skipper-gridfs'),
            uri: 'mongodb://localhost:27017/restaurant.images'
        }, function (err, uploadedImages) {
            if (err) return res.negotiate(err);

            var obj = {};
            if (req.param('product_id')) {
                obj = Product;
            } else if (req.param('product_category_id')) {
                obj = ProductCategory;
            } else {
                return res.badRequest({ message: 'Parent entity not found' });
            }
            var id = req.param('product_id') || req.param('product_category_id');

            obj.findOne({ id: id }).then(function (found) {
                if (!found) throw new Error('Related entity not found');
                return found;
            }).then(function (found) {
                for (var i in uploadedImages) {
                    if (!found.images) found.images = [];
                    found.images.push(uploadedImages[i].fd);
                }
                obj.update({ id: id }, { images: found.images }).exec(function (err, updated) {
                    return res.ok({
                        files: uploadedImages,
                        textParams: req.params.all()
                    });
                })
            }).catch(function (error) {
                console.error(error);
                return res.badRequest({ message: error.message });
            });

        });
    },
    viewImage: function (req, res) {
        var blobAdapter = require('skipper-gridfs')({
            uri: 'mongodb://localhost:27017/restaurant.images'
        });

        var fd = req.param('id'); // value of fd comes here from get request
        blobAdapter.read(fd, function (error, file) {
            if (error) {
                res.json(error);
            } else {
                res.contentType('image/jpeg');
                res.send(new Buffer(file));
            }
        });
    },
    delete: function (req, res) {
        var blobAdapter = require('skipper-gridfs')({
            uri: 'mongodb://localhost:27017/restaurant.images'
        });

        var fd = req.param('id'); // value of fd comes here from get request
        blobAdapter.rm(fd, function (error, file) {
            if (error) {
                res.json(error);
            } else {
                var Promise = require('q');
                // remove relations
                Promise.all([
                    Product.findOne({ images: fd }),
                    ProductCategory.findOne({ images: fd })
                ])
                    .spread(function (product, product_category) {
                        if (product) {
                            var i = product.images.indexOf(fd);
                            if (i > -1) {
                                product.images.splice(i, 1);
                            }
                            Product.update({ images: fd }, { images: product.images }).exec(function (err, updated) {
                                if (err) throw new Error(err);
                                return res.ok({
                                    removed_image: fd,
                                    product_updated: updated[0].id
                                });
                            });
                        } else if (product_category) {
                            var i = product_category.images.indexOf(fd);
                            if (i > -1) {
                                product_category.images.splice(i, 1);
                            }
                            ProductCategory.update({ images: fd }, { images: product_category.images }).exec(function (err, updated) {
                                if (err) throw new Error(err);
                                return res.ok({
                                    removed_image: fd,
                                    product_category_updated: updated[0].id
                                });
                            });
                        } else {
                            return res.ok({
                                removed_image: fd
                            });
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                        return res.badRequest({ message: error });
                    });

            }
        });
    }


};

