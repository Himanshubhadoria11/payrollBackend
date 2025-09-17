const express = require('express')
const UserController =require('../controllers/UserController') 
const route = express.Router()
const checkUserAuth=require('../middleware/auth')
const JobController = require('../controllers/JobController')
const ApplicationController = require('../controllers/ApplicationController')
const CategoryController = require('../controllers/CategoryController')
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

//Application Model
route.post('/post',checkUserAuth,ApplicationController.postApplication)
route.get('/employer/getall',checkUserAuth,ApplicationController.employerGetAllApplications)
route.get('/jobseeker/getall',checkUserAuth,ApplicationController.jobseekerGetAllApplications)
route.delete('/delete/:id',checkUserAuth,ApplicationController.jobseekerDeleteApplication);

//CategoryController
route.post('/categoryInsert',checkUserAuth,CategoryController.Category_insert)
route.get('/displayCategory',CategoryController.DisplayCategory)
route.get('/viewCategory',checkUserAuth,CategoryController.ViewCategory)
route.post('/editCategory/:id',checkUserAuth,CategoryController.EditCategory)
route.get('/deleteCategory/:id',checkUserAuth,CategoryController.deleteCategory)
route.get("/categorylist/:cname", checkUserAuth, CategoryController.CategoryList)



// ---------------- SALARY SLIPS ----------------
route.get('/salary-slips', checkUserAuth, SalarySlipController.getSalarySlips)
route.post('/salary-slips', checkUserAuth, SalarySlipController.createSalarySlip)
route.put('/salary-slips/:id', checkUserAuth, SalarySlipController.updateSalarySlip)
route.delete('/salary-slips/:id', checkUserAuth, SalarySlipController.deleteSalarySlip)

// ---------------- EMPLOYEE EXPENSES ----------------
route.post('/expenses', checkUserAuth, ExpenseController.addExpense)       // Add expense
route.get('/expenses', checkUserAuth, ExpenseController.getExpenses)      // Get expenses




module.exports = route;