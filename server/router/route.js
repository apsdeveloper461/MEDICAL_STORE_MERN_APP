const express=require('express')
const {newproduct, updateProduct}=require('../controllers/Product')
const {getAllProduct, customProduct}=require('../controllers/SerachProduct')
const { addStock, removeStock }=require('../controllers/Stock')
const { getAlllogHistory, getCustomProductHistory }=require('../controllers/logHistorySeacrh')
const { categoryCountGraphData, ProductGraph, SaleGraph, ProductSalesDetail }=require('../controllers/graph')

const router=express.Router()

// add new product to store
router.post('/new_product', newproduct)
// update new product to store
router.post('/update_product',updateProduct)
// get All product List
router.get('/products',getAllProduct)
// get custom product detail
router.post('/customproduct',customProduct)
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
//sales graph according month and year
router.post('/totalsale',SaleGraph)
// get product graph according to year
router.post('/productgraph',ProductGraph)

router.get('/dashboard',ProductSalesDetail)




module.exports=router 