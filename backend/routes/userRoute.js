const express = require("express");
const router =express.Router();
// const upload = require('../path/to/your/multer/config'); // Adjust the path to your multer configuration

const users = require('../controllers/user');
const hometable = require('../controllers/hometable');
const homepage = require('../controllers/homepage');
const employee= require('../controllers/employee');
const agent = require('../controllers/agent');
const dealer = require('../controllers/dealer');
const transport = require('../controllers/transport');
const customer = require('../controllers/customer');
const itemmaster = require('../controllers/itemMaster')
const pagemaster = require('../controllers/pagemaster')
const lablemaster = require('../controllers/label_barcode')
const masterSetting = require('../controllers/masterSetting');
const sti = require('../controllers/sti');
const fillCombo = require('../controllers/fillCombo');
const addProductData= require('../controllers/addProductData');
// const imageupdate = require("../controllers/imageupdate");
const master = require('../controllers/master');
const salesmaster = require('../controllers/salesmaster');
const salesdetail = require('../controllers/salesdetail');
const rfmaster = require('../controllers/rfmaster');

router.post("/addProducts",addProductData.addProducts);
router.get('/getCodeTypeData', addProductData.getCodeTypeData);
router.get('/getCodeTypeAllData', addProductData.getCodeTypeAllData);
router.put('/editProducts/:primekeyid', addProductData.editProduct);
router.delete('/deleteProducts/:primekeyid', addProductData.deleteProduct);
router.get('/getCompanyId', addProductData.getCompanyId);
router.get('/getNextSequence', addProductData.getNextSequence);

// const { addItem } = require('../controllers/itemMaster');


// router.post("/add_Images",imageupdate.addImages);


router.post("/addItem",itemmaster.addItem);
router.get("/items/:id",itemmaster.getItems);
router.get("/getallitems",itemmaster.getallitems);
router.put("/update/:id",itemmaster.updateItem);
// router.put('/update/:id', upload.single('image'), itemController.updateItem);
router.delete("/delete/:id",itemmaster.deleteItem);
// router.get("/unique-values",itemmaster.getUniqueValues)
// router.get('/dropdowns',itemmaster.getDropdownValues);

router.get('/dropdownsvalues',master.getDropdown);
router.get('./postcsbAW',fillCombo.postcsbAW);


router.post("/save-exchange-policy",pagemaster.addPolicy);
router.get("/get-exchange-policy",pagemaster.getPolicy);
router.get("/get-page-info",pagemaster.getPageInfo);
router.post("/save-page-info",pagemaster.addPolicy);


// Define the route with SALEID as a URL parameter
// router.get("/getSalesMaster",salesmaster.getSalesMaster);
router.get("/getSalesMaster/:saleId?", salesmaster.getSalesMaster);
router.post("/addSalesMaster",salesmaster.addSalesMaster);


router.get("/getSalesDetail/:saleId?",salesdetail.getSalesDetail);
router.post("/addSalesDetail",salesdetail.addSalesDetail);
// ✅ Route to Get Invoices
router.get("/getInvoices", salesdetail.getInvoices);

router.post("/add_user",users.addUser);
router.post("/login",users.loginUser);
router.get("/getAllUsers",users.getAll);
router.delete("/deleteUsers/:id",users.deleteUser);
router.put("/editUser/:id",users.editUser);


router.post("/add_customer",customer.addcustomer);
router.post("/login_customer",customer.logincustomer);
router.get("/getcustomerbyid/:customerId",customer.getcustomerbyid);
router.put("/updateCustomerInfo",customer.updateCustomerInfo);
router.get("/getAllcustomer",customer.getAll);
// router.delete("/deletecustomer/:id",customer.deletecustomer);
// router.put("/editcustomer/:id",customer.editcustomer);

//homepage
router.post("/add_data",homepage.add_data);
router.get("/get_data",homepage.get_data);
router.delete("/delete_data/:id",homepage.delete_data);
router.put("/update_data/:id",homepage.update_data);

//hometable
router.post("/add_hometable", hometable.add_data);
router.get("/get_hometable", hometable.get_data);
router.put("/update_hometable/:id", hometable.update_data);
// router.delete("/delete_hometable/:id", hometable.delete_data);



router.get("/getMasterSet",masterSetting.getMasterSetting);
router.get("/getCodetype",masterSetting.getAllMasterSettings)

// router.get("/getcmb/:id",fillCombo.getcmb);
router.post("/postcmb",fillCombo.postcmb);
router.post("/postcmbAW",fillCombo.postcmbAW);
router.get("/getcmbAW",fillCombo.getcmbAW);

router.get("/getMaster",agent.getMaster);
router.get("/getMasterPagination",agent.agents);
router.post("/addMaster",agent.addMaster);

router.get("/getStiDetail",sti.getStiDetail);

router.get("/getEmployee",employee.getEmployee);

router.get("/getDealer",dealer.getDealer);

router.get("/getTransport",transport.getTransport);

router.get("/getCustomer",customer.getCustomer);

// router.get("/getItem",itemmaster.getItem);

router.get("/getLable",lablemaster.getLable);

router.get("/getrfmaster",rfmaster.getrfmaster);
router.get("/getMasterSet",rfmaster.getMasterSet);

module.exports = router