const express = require('express')
const UserController =require('../controllers/UserController') 
const route = express.Router()
const checkUserAuth=require('../middleware/auth')
const JobController = require('../controllers/JobController')
const SalarySlipController = require('../controllers/salarySlipController') 
const ExpenseController = require('../controllers/ExpenseController') 


//usercontroller
route.get('/getUser',checkUserAuth,UserController.getUser)
route.post('/register',UserController.registerUser)
route.post('/login',UserController.login)
route.get('/profile',checkUserAuth, UserController.profile)
route.post('/changepassword/:id',checkUserAuth, UserController.changePassword)
route.post('/updateprofile/:id',checkUserAuth, UserController.updateProfile)
route.get('/logout',UserController.logout)


//jobController
route.post('/jobInsert',checkUserAuth,JobController.postJob)
route.get('/getalljob',JobController.getallJob)
route.get('/getMyJobs',checkUserAuth,JobController.getMyJobs)
route.post('/updateJob/:id',checkUserAuth,JobController.updateJob)
route.get('/deleteJob/:id',checkUserAuth,JobController.deleteJob)
route.get('/getSingleJob/:id',JobController.getSingleJob)





// ---------------- SALARY SLIPS ----------------
route.get('/salary-slips', checkUserAuth, SalarySlipController.getSalarySlips)
route.post('/salary-slips', checkUserAuth, SalarySlipController.createSalarySlip)
route.put('/salary-slips/:id', checkUserAuth, SalarySlipController.updateSalarySlip)
route.delete('/salary-slips/:id', checkUserAuth, SalarySlipController.deleteSalarySlip)

// ---------------- EMPLOYEE EXPENSES ----------------
route.post('/expenses', checkUserAuth, ExpenseController.addExpense)       // Add expense
route.get('/expenses', checkUserAuth, ExpenseController.getExpenses)      // Get expenses




module.exports = route;