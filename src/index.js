// Purpose: Entry point for the application
import express from 'express'
import { uploadItems } from '../database.js'

const app = express();
app.use(express.static('uploads'));

app.use(express.json());

app.get ('/', (req, res) => {
   res.send("Hello World")
});

app.post('/upload', async (req, res) => {
   console.log(req.body);
   const items = await uploadItems(
      req.body.name, req.body.image, req.body.price, req.body.discountPrice, req.body.weight, req.body.ingredients, req.body.howtouse, req.body.benefits, req.body.category
   );
   res.send("success")
});

const port = process.env.PORT || 3000
app.listen(port, () => {
   console.log("Server Listening on PORT " + port);
});
