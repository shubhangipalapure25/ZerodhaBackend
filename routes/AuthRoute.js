const express = require('express');
const router = express.Router();
const {Signup,Login}= require("../controllers/AuthController");
const {HoldingModel} = require('../model/HoldingsModel');
const {PositionModel } = require('../model/PositionsModel');
const {userVerification} = require('../Middlewares/AuthMiddleware');

// router
// .route("/signup")
// .post(Signup);

router.post('/',userVerification)
router.post("/signup", Signup);
router.post("/login", Login);

router.get("/allHoldings", async (req,res) =>{
    let allHoldings = await HoldingModel.find({});
    res.json(allHoldings);
 });
 
 router.get("/allPositions", async (req,res) =>{
     let allPositions = await PositionModel.find({});
     res.json(allPositions);
  });

module.exports = router;