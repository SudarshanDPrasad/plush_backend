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
   getFeedBack,
   createUser,
   getUser,
   getUserOrders
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
   const { name, address, orders, phoneNumber, totalAmount, image} = req.body;
   console.log(name)
   const items = await customerOrders(name, address, orders, phoneNumber, totalAmount,image);
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

// Create User
app.post('/createUser', async (req, res) => {
   const { name, mobileNumber, password } = req.body;
   if (password.length < 6) {
      res.status(200).send({
         "message": "Password should be atleast 6 characters"
      });
      return;
   } else if (mobileNumber.length < 10) {
      res.status(200).send({
         "message": "Mobile Number should be atleast 10 characters"
      });
      return;
   } else if (name.length < 3) {
      res.status(200).send({
         "message": "Name should be atleast 3 characters"
      });
      return;
   } else {
      const userExist = await getUser(mobileNumber, password);
      if (userExist.length > 0) {
         res.status(200).send({
            "message": "User already exists"
         });
         return;
      } else {
         const user = await createUser(name, mobileNumber, password);
         console.log(user[0]);
         res.status(200).send({
            "message": "success"
         });
      }
   }
});

// Get User 
app.get('/getUser', async (req, res) => {
   const { mobileNumber, password } = req.query;
   const user = await getUser(mobileNumber, password);
   const userOrders = await getUserOrders(mobileNumber);
   console.log(userOrders)
   console.log(user)
   if (user.length > 0) {
      res.status(200).send({
         "user": user[0],
         "userOrders": userOrders
      });
   } else {
      res.status(200).send({
         "message": "User not found"
      });
   }
});

const port = process.env.PORT || 3000
app.listen(port, () => {
   console.log("Server Listening on PORT " + port);
});
