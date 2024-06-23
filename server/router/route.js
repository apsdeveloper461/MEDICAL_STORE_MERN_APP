const express=require('express')
const {newproduct,updateProduct} = require('../controllers/Product')
const {addStock,removeStock} = require('../controllers/Stock')
const { getAllProduct } = require('../controllers/SerachProduct')
const { getAlllogHistory, getCustomProductHistory } = require('../controllers/logHistorySeacrh')
const { categoryCountGraphData } = require('../controllers/graph')
const router=express.Router()

// add new product to store
router.post('/new_product',newproduct)
// update new product to store
router.post('/update_product',updateProduct)
// get All product List
router.get('/products',getAllProduct)
// adding stock in existing product
router.post('/add_stock',addStock)
// removin stock in existing product
router.post('/remove_stock',removeStock)
// get all log
router.get('/log',getAlllogHistory)
// get log of required product 
router.post('/customlog',getCustomProductHistory)



                // Here start router for graph data
// category Data for pie gragh
router.get('/categorygraph',categoryCountGraphData)


module.exports=router