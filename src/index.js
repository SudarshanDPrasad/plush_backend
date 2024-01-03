// Purpose: Entry point for the application
import express from 'express'
import { uploadItems, getProducrs,editProduct } from '../database.js'
import path from 'path'
import multer from 'multer'

const app = express();
app.use(express.static('uploads'));

app.use(express.json({limit: '50mb'}));
app.use(express.static('uploads'));

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

app.post('/upload', cpUpload, async (req, res) => {
   const { file } = req.files;
   const { name, image, price1, price2, price3, discountPrice, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability } = req.body;
   console.log(name)
   const items = await uploadItems(name, image, price1, price2, price3, discountPrice, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability);
   res.status(200).send("success");
});

app.get('/product', async (req, res) => {
   const { category } = req.query;
   const items = await getProducrs(category);
   console.log(items)
   res.status(200).send({
      "items": items
   });
});

app.patch('/updateProduct', async (req, res) => {
   const { id, name, image, price1, price2, price3, discountPrice, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability } = req.body;
   const items = await editProduct(id, name, image, price1, price2, price3, discountPrice, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability);
   res.status(200).send("success");
});

const port = process.env.PORT || 3000
app.listen(port, () => {
   console.log("Server Listening on PORT " + port);
});
