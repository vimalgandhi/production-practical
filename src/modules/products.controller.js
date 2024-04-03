const productModel = require('../models/products.model');
const mongoose = require('mongoose');
const multer = require("multer");

const upload = multer({dest : 'uploads/'});
const csvtojson = require('csvtojson');

const productController = {
    getProductList : async (req, res) => {
        try {
            const data = await productModel.find();
            return res.status(200).json(data);
        } catch (error) {
            res.status(500).json({error: "Something went wrong!", message: error.message});
        }
    },
    createProduct : async (req, res) => {
        try {
            const {category_name,
                product_name  ,
                product_barcode,
                product_sku,
                product_color,
                product_size , 
                product_price } = req.body
            const product = await productModel({
                category_name,
                product_name,
                product_barcode,
                product_sku,
                product_color,
                product_size,
                product_price
            })
            await product.save();

            return res.status(201).json({message: "Product created successfully!",product});
        } catch (error) {
            res.status(500).json({error: "product creation failed", message: error.message});
        }
    },
    updateProduct : async (req, res) => {
            try {
                const {product_id,category_name,
                    product_name,
                    product_barcode,
                    product_sku,
                    product_color,
                    product_size,
                    product_price } = req.body;
                const product = {
                    category_name,
                    product_name,
                    product_barcode,
                    product_sku,
                    product_color,
                    product_size,
                    product_price 
                }
                await productModel.updateOne({
                    _id : product_id
                },product)
                return res.status(200).json({message: "Product updated successfully!", product});
            } catch (error) {
                res.status(500).json({error: "product update failed", message: error.message});
            }
    },
    deleteProduct : async (req, res) => {
            const { product_id} = req.params;
            try {
                await productModel.deleteOne({_id : product_id});
                return res.status(200).json({message: "Product deleted successfully!"});
            } catch (error) {
                res.status(500).json({error: "product delete failed", message: error.message});
            }
    }
    ,
    uploadXlsxFile: async (req, res) => {
        try {
            const newFile = new File({
                filename: req.file.originalname, 
                contentType: req.file.mimetype 
            });
            await newFile.save();
            res.status(201).send('File uploaded successfully');
        } catch (error) {
            res.status(500).json({error: "Something went wrong!", message: error.message});
        }
    }
};
module.exports =productController;
