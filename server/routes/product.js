const express = require("express");
const router = express.Router();
const {Product} = require("../models/Product");
const multer = require("multer");
const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage : storage }).single("file")

router.post("/image", (request, response)=>{

    upload(request, response, err =>{
        if(err) return response.json({ success : false, err })
        return response.json({ success : true, filePath : response.req.file.path, fileName : response.req.file.filename  })
    });

});

router.post("/", (request, response)=>{
    // 받아온 상품 정보를 DB에 저장
    console.log(request.body);
    let product = new Product(request.body);
    product.save((err, result)=>{
        if(err) return response.status(400).json({ success : false, err })
        response.status(200).json({ success : true, result })
    })
});

module.exports = router;