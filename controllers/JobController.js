const JobModel = require("../models/job");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class JobController{
    static getallJob= async (req,res)=>{
        try{
           const jobs =await JobModel.find({expired: false});
           res.status(200).json({
            success: true,
            jobs,
           });

        }catch(error) {
           console.log(error);
        }

    };
    static postJob= async (req,res)=>{
        try{
            const{role}=req.userdata;
            if(role==="Job Seeker"){
                res.status(400).json({
                    status:"failed",
                    message:"Job Seeker not allowed to access this resource",

                });
            }
            const {
                title,
                description,
                category,
                country,
                city,
                location,
                fixedSalary,
                salaryFrom,
                salaryTo,
            }=req.body;

            if(
                !title ||
                !description ||
                !category ||
                !country ||
                !city ||
                !location
            ) {
                res.status(400).json({
                    status:"failed",
                    message:"Please provide full job details",
              });
            }
            if((!salaryFrom || !salaryTo) && !fixedSalary){
                res.status(400).json({
                    status:"failed",
                    message:"Please either provide fixed salary or ranged salary",
                });
            }

            if(salaryFrom && salaryTo && fixedSalary){
                res.status(400).json({
                    status:"failed",
                    message:"Cannot Enter Fixed and Ranged Salary together",

                });
            }
            const postedBy=req.userdata._id;
            const job=await JobModel.create({
                title,
                description,
                category,
                country,
                city,
                location,
                fixedSalary,
                salaryFrom,
                salaryTo,
                postedBy,
            });
            res.status(200).json({
                success:true,
                message:"Job Posted Successfully!",
                job,
            });

        }catch(error){
            console.log(error);
        }
     };
    static getMyJobs= async (req,res)=>{
        try{
         const {role} = req.userdata;
         if(role==="Job Seeker") {
            res.status(400).json({
                status:"failed",
                message:"Job Seeker not allowed to access this resource",
            });
         }
         const myJobs =await JobModel.find({postedBy: req.userdata._id});
         res.status(200).json({
            success: true,
            myJobs,
         });

        }catch(error){
            console.log(error);
        }

    };
    static updateJob= async (req,res)=>{
        try{
            const {role}=req.userdata;
            if(role==="Job Seeker"){
                res.status(400).json({
                    status:"failed",
                    message:"Job Seeker not allowed to access this resource",
                });
            }
            const{id}=req.params;
            let job =await JobModel.findById(id);
            if(!job){
                res.status(400).json({
                    status:"failed",
                    message:"OOPS! Job not found",
                });
            }
            job=await JobModel.findByIdAndUpdate(id, req.body,{
                new:true,
                runValidators:true,
                useFindAndModify:false,
            });
            res.status(200).json({
                success:true,
                message:"Job Updated",
            });
        }catch(error){
            console.log(error);
        }

    };
    static deleteJob= async (req,res)=>{
        try{
            const{role} =req.userdata;
            if(role==="Job Seeker"){
                res.status(400).json({
                    status:"failed",
                    message:"Job Seeker not allowed to access this resource",


                });
            }
            const {id} =req.params;
            let job=await JobModel.findById(id);
            if(!job){
                res.status(400).json({
                    status:"failed",
                    message:"OOPS! Job not found",
                });
            }
            await JobModel.deleteOne();
            res.status(200).json({
               success:true,
               message:"Job Deleted!", 
            });
        }catch(error){
            console.log(error);
        }

    };
    static getSingleJob= async (req,res)=>{
        try{
            const{id}=req.params;
            let job=await JobModel.findById(id);
            if(!job){
                res.status(400).json({
                    status:"failed",
                    message:"OOPS! Job not found",
                });
            }
            res.status(200).json({
                success:true,
                job,
            });
        }catch(error){
            console.log(error);
        }

    };

}

module.exports= JobController;