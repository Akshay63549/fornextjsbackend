
import multer from "multer"
import connectDb from "@/middleware/mongoose"
import Product from "@/models/Product"
import DatauriParser from 'datauri/parser';
const parser = new DatauriParser();

const upload = multer({ storage: multer.memoryStorage() })
const cloudinary = require('cloudinary');
import path from 'path';

cloudinary.v2.config({
  cloud_name: 'de8e654d7',
  api_key: '149298696899376',
  api_secret: 'nS-52xghIO9LBnI9U_lE3WHE8PI',
  secure: true,
});

export const config = {
  api: {
    bodyParser: false
  }
}
const dataUri = req => parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      upload.single("image")(req, res, async function(err) {
        try {
          if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: "Multer error occurred" })
          } else if (err) {
            console.log(err, "error1")
            return res.status(500).json({ error: err.message })
          }

          const folderName = "Product"
          const image = req.file
          console.log(image)
          const collectionName = "demo"

          const result = await cloudinary.uploader.upload(dataUri(req).content, {
            public_id: `${folderName}/_product_${Math.floor(
              Math.random() * 10
            )}/${Date.now()}`,
            width: 500,
            height: 500,
            crop: "fill",
            tags: collectionName
          })

          const uploadedImage = result.secure_url
          console.log(uploadedImage, "uploadedImage")

          // Create a new product
          const p = new Product({
            title: req.body.title,
            img: uploadedImage
          })

          await p.save()

          return res.status(200).json({ success: "Success!", data: p })
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error)
          return res
            .status(500)
            .json({ error: "Error uploading image to Cloudinary" })
        }
      })
    } else {
      return res
        .status(400)
        .json({ error: "Error! This method is not allowed." })
    }
  } catch (error) {
    console.error("Server error:", error)
    return res.status(500).json({ error: "Server error" })
  }
}

export default connectDb(handler)
