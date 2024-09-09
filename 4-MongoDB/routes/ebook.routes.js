const express = require("express");
const { createEbook, updateEbook, allEbooks, GetSingleEbook, DeleteEbook, purchaseEbook, DownloadEbook } = require("../controllers/Ebook.controllers");
const { check } = require("express-validator"); //from express-validator
const EbookModel = require("../models/ebook.model");
const uploadPdf = require("../middlewares/upload-pdf");
const verifyUser = require("../middlewares/verifyUser");
const ebookRoutes = express.Router();

const validators = [

    check('title')
        .not()
        .isEmpty()
        .withMessage("Ebook Title is Required")
        .custom(async (value) => {

            const ebook = await EbookModel.findOne({ title: value });

            if (ebook) {
                throw new Error('Ebook Title Already Exists');
            }

            return true;
        }),

    check('description')
        .not()
        .isEmpty()
        .withMessage("Ebook Description is Required"),

    check('price')
        .not()
        .isEmpty()
        .withMessage("Ebook Price is Required")
        .isNumeric()
        .withMessage("Ebook Price must be a Number")



]

ebookRoutes.post('/createEbook', uploadPdf.single("ebook"), validators, verifyUser, createEbook);
ebookRoutes.get('/allEbooks', allEbooks);
ebookRoutes.post("/purchase/:ebookId",verifyUser,purchaseEbook);
ebookRoutes.get("/download/:accessToken",verifyUser,DownloadEbook);
ebookRoutes.get("/getSingle/:ebookId", GetSingleEbook);
ebookRoutes.put("/update/:ebookId", uploadPdf.single("ebook"), validators, verifyUser, updateEbook);
ebookRoutes.delete("/delete/:ebookId", verifyUser, DeleteEbook)

module.exports = ebookRoutes;