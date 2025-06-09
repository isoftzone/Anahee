// const express = require("express");
// const router = express.Router();
// // const shiprocket = require("../controllers/shiprocket");
// const phonepeController = require("../controllers/phonepe");

// // router.post("/checkServiceability", shiprocket.checkServiceability);
// // router.post("/payment", phonepe.initiatePayment);
// // router.post("/verify", phonepe.verifyPayment);
// console.log("apiRoute loaded");
// router.get("/token", phonepeController.getToken);
// router.post("/create-order", phonepeController.createOrder);
// router.get("/order-status/:orderId", phonepeController.checkOrderStatus);

// module.exports = router;


const express = require("express");
const router = express.Router();
const shiprocket = require("../controllers/shiprocket");
const phonepeController = require("../controllers/phonepe");
router.get("/authenticateShiprocket", shiprocket.authenticateShiprocket);
router.post("/checkServiceability", shiprocket.checkServiceability);
// router.post("/payment", phonepe.initiatePayment);
// router.post("/verify", phonepe.verifyPayment);
router.get("/token", phonepeController.getToken);
router.post("/create-order", phonepeController.createOrder);
router.get("/order-status/:orderId", phonepeController.checkOrderStatus);
module.exports = router;