const User = require('../models/User')
const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")

const registerUser = asyncHandler( async (req, res) => {
  const { name, email, password, image } = req.body;

    const user = await User.findOne({ email })
  
    if(user) {
      res.status(400)
      throw new Error("User already exists")
    }
  
    const newUser = await User.create({
      name, 
      email,
      password,
      image
    })
  
    if(newUser) {
      return res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        image: newUser.image,
        token: generateToken(newUser._id)
      }
      )
    } else {
      res.status(400)
      throw new Error("Error occured")
    }

})

// login user
const authUser = asyncHandler( async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }

})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.image = req.body.image || user.image

    if(req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save();

    return res.status(201).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      // isAdmin: upd.isAdmin,
      image: updatedUser.image,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})


module.exports = { registerUser, authUser, updateUserProfile }