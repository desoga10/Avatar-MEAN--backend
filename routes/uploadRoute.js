const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const cloudinary = require('../config/cloudinary')
const upload = require('../middleware/multer')
const Avatar = require('../model/avatar')

//POST Upload Route
router.post('/add', upload.single('avatar'), asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)

    //Create Uploads
    let imageUploads = new Avatar({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id
    })
    //Save Upload
    const createdImage = await imageUploads.save();
    res.status(201).json(createdImage);
  } catch (err) {
    console.log(err);
  }

}))

//GET Upload Route
router.get('/', asyncHandler(async (req, res) => {
  try {
    let createdImage = await Avatar.find();
    res.json(createdImage)
  } catch (err) {
    console.log(err)
    throw new Error('Upload Cannot Be Found')
  }
}))

//GET a Specific Upload
router.get('/:id', asyncHandler(async (req, res) => {
  try {
    // Find upload by id
    let createdImage = await Avatar.findById(req.params.id);
    res.json(createdImage)
  } catch (err) {
    console.log(err);
    throw new Error('Upload Cannot Be Found')
  }
}))

//Update Specific Upload
router.put('/update/:id', upload.single('avatar'), asyncHandler(async (req, res) => {

  try {

    let imageUploads = await Avatar.findById(req.params.id);
    await cloudinary.uploader.destroy(imageUploads.cloudinary_id)

    const result = await cloudinary.uploader.upload(req.file.path)

    const { name } = req.body;

    dataUpdate = {
      name: name || imageUploads.name,
      avatar: result.secure_url || imageUploads.avatar,
      cloudinary_id: result.public_id || user.cloudinary_id
    }
    imageUploads = await Avatar.findByIdAndUpdate(req.params.id, dataUpdate, { new: true })
    res.status(201).json(imageUploads);


  } catch (err) {
    console.log(err)
    throw new Error('Upload Cannot Be Found')
  }

}))

//Delete Upload Route
router.delete('/delete/:id', asyncHandler(async (req, res) => {
  try {
    const imageUploads = await Avatar.findById(req.params.id);
    await cloudinary.uploader.destroy(imageUploads.cloudinary_id)
    await imageUploads.remove();
    res.json({ message: "Avatar Deleted Successfully" });
  } catch (err) {
    console.log(err)
    throw new Error('Upload Cannot Be Found')
  }
}))

module.exports = router