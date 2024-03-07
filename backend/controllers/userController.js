import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"

import generateToken from "../utils/generateToken.js"


// @desc  Auth user // get token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })


    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error("invalid email or password")
    }

})

// @desc  register user
// @route Post /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error("email already registered")
    }

    const user = await User.create({
        name, email, password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @desc  logout user / clear cookie
// @route Post /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
})

// @desc  get user profile
// @route Get /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @desc  Update user profile
// @route Put /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,


        })

    } else {
        res.status(404)
        throw new Error("User not found")
    }

})

// @desc  Get users
// @route Get /api/users
// @access private/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("get users")
})

// @desc  Get user by ID
// @route Get /api/users/:id
// @access private/admin
const getUserById = asyncHandler(async (req, res) => {
    res.send("get user by id")
})

// @desc  update user by ID
// @route Get /api/users/:id
// @access private/admin
const updateUserById = asyncHandler(async (req, res) => {
    res.send("update user by id")
})

// @desc  delete user
// @route Delete /api/users/:id
// @access private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete users")
})

export {
    authUser, registerUser, logoutUser, getUserById, getUserProfile, updateUserProfile, getUsers, deleteUser, updateUserById
}