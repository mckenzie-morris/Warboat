import User from '../models/user.js'
import bcrypt from 'bcrypt'

// GET
const getUser = async (req, res) => {
// mongoose => API => Model
}

// POST
const createNewUser = async (req, res ) => {
// mongoose => API => Model
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({message: 'Both fields required'})
    }
}

// PATCH
const updateUser = async (req, res) => {
// mongoose => API => Model
}

// DELETE
const deleteUser = async (req, res) => {
// mongoose => API => Model
}

export { getUser, createNewUser, updateUser, deleteUser}