const express=require("express");
const router=express.Router();
const { createUser, deleteUser, getUser, updateUser, getAllUser } = require("../controllers/CreateUser");

// Auth Controller Function
const { userSignUp, userLogin } = require("../controllers/AuthController");

// Auth Route
router.post("/userSignUp",userSignUp)

router.post("/userLogin",userLogin)

//get all user Route
router.get("/getAllUsers",getAllUser) 
//createUser Route
router.post("/createUser",createUser)

// update Routes
router.patch("/updateUser/:id",updateUser)

// getUser Route
router.get("/getUser/:id",getUser)

// deleteUser Route
router.delete("/deleteUser/:id",deleteUser)


module.exports=router;