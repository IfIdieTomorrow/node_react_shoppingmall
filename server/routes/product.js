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

// 상품을 업로드 하기 전 이미지부터 업로드
router.post("/image", (request, response)=>{
    upload(request, response, err =>{
        if(err) return response.json({ success : false, err })
        return response.json({ success : true, filePath : response.req.file.path, fileName : response.req.file.filename  })
    });

});

// 상품 업로드
router.post("/", (request, response)=>{
    // 받아온 상품 정보를 DB에 저장
    console.log(request.body);
    let product = new Product(request.body);
    product.save((err, result)=>{
        if(err) return response.status(400).json({ success : false, err })
        response.status(200).json({ success : true, result })
    })
});

// 모든 상품 정보
router.post("/products", (request, response)=>{

    let limit = request.body.limit ? parseInt(request.body.limit) : 12;
    let skip = request.body.skip ? parseInt(request.body.skip) : 0;
    let term = request.body.searchTerm;
    
    let findArgs = {};

    for(let key in request.body.filters) {
        if(request.body.filters[key].length > 0){
            if(key === "price") {
                findArgs[key] = {
                    // [key][0]인덱스보다 큰 숫자
                    $gte: request.body.filters[key][0],
                    // [key][0]인덱스보다 작은 숫자
                    $lte: request.body.filters[key][1]
                }
            } else {
                findArgs[key] = request.body.filters[key]
            }
        }
    }

    if(term) {
        Product.find(findArgs)
        .find({ $text : {$search: term}})
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo)=>{
            if(err) return response.status(400).json({ success : false, err })
            return response.status(200).json({ 
                success : true, 
                productInfo,
                postSize : productInfo.length    
            })
        })
    } else {
        Product.find(findArgs)
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo)=>{
            if(err) return response.status(400).json({ success : false, err })
            return response.status(200).json({ 
                success : true, 
                productInfo,
                postSize : productInfo.length    
            })
        })
    }
})

// 상품의 상세 정보
router.get("/products_by_id", (request, response)=> {
    // productId를 이용해서 상세정보 가져오기
    let type = request.query.type;
    let productIds = request.query.id;

    if(type === "array"){
        let ids = request.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })
    }

    Product.find({ _id : {$in: productIds} })
    .populate('writer')
    .exec((err, product) => {
        if(err) return response.status(400).send(err)
        return response.status(200).send(product)
    })

});

module.exports = router;