// Purpose: Entry point for the application
import express from 'express'
import {
   uploadItems,
   getProducrs,
   editProduct,
   customerOrders,
   getOrders,
   searchProduct,
   uploafFeedBack,
   getFeedBack
} from '../database.js'
import path from 'path'
import multer from 'multer'

const app = express();
app.use(express.static('uploads'));

app.use(express.json({ limit: '50mb' }));
app.use(express.static('uploads'));
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "*");
   res.header("Access-Control-Allow-Methods", "*");
   next();

});

const __dirname = path.resolve();
app.use('/uploads', express.static(__dirname + '/uploads'));
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads')
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname)
   }
})
var upload = multer({ storage: storage })
var cpUpload = upload.fields([
   { name: 'file', maxCount: 1 },
   { name: 'Text', maxCount: 1 },
   { name: 'Text', maxCount: 1 },
   { name: 'Text', maxCount: 1 },
   { name: 'Text', maxCount: 1 },
   { name: 'Text', maxCount: 1 },
   { name: 'Text', maxCount: 1 },
   { name: 'Text', maxCount: 1 },
   { name: 'Text', maxCount: 1 },
])

// Upload Product
app.post('/upload', cpUpload, async (req, res) => {
   const { file } = req.files;
   const { name, image, price1, price2, price3, discountPrice, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability, bestSeller } = req.body;
   console.log(name)
   const items = await uploadItems(name, image, price1, price2, price3, discountPrice, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability, bestSeller);
   res.status(200).send("success");
});

// Search Product List
app.get('/product', async (req, res) => {
   const { category } = req.query;
   const items = await getProducrs(category);
   console.log(items)
   setTimeout(() => {
      res.status(200).send({
         "items": items
      });
   }, 1000);
});

// Update Product
app.patch('/updateProduct', async (req, res) => {
   const { id, name, image, price1, price2, price3, discountPrice, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability, bestSeller } = req.body;
   const items = await editProduct(id, name, image, price1, price2, price3, discountPrice, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability, bestSeller);
   res.status(200).send("success");
});

// Customer Orders
app.post('/customerOrders', async (req, res) => {
   const { name, address, orders, phoneNumber, totalAmount } = req.body;
   console.log(name)
   const items = await customerOrders(name, address, orders, phoneNumber, totalAmount);
   console.log(items);
   res.status(200).send("success");
});

// Get Orders
app.get('/getOrders', async (req, res) => {
   const items = await getOrders();
   console.log(items)
   res.status(200).send({
      "items": items
   });
});

// Search Product
app.get('/searchProduct', async (req, res) => {
   const { product } = req.query;
   const items = await searchProduct(product);
   console.log(items.length)
   res.status(200).send({
      "items": items
   });
});


// FeedBack
app.post('/feedBack', async (req, res) => {
   const { name, feedback, stars } = req.body;
   const items = await uploafFeedBack(name, feedback, stars);
   console.log(items);
   res.status(200).send("success");
});

// Get Feedback
app.get('/getFeedBack', async (req, res) => {
   const items = await getFeedBack();
   console.log(items)
   res.status(200).send({
      "items": items
   });
});

const port = process.env.PORT || 3000
app.listen(port, () => {
   console.log("Server Listening on PORT " + port);
});
