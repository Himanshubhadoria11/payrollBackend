const CategoryModel = require('../models/category')
const JobModel = require('../models/job')



class CategoryController {

    static Category_insert = async (req, res) => {
        try {
            // console.log(req.body)
            const { name,icon} = req.body
            const result = new CategoryModel({
                name:name,
                icon:icon
               
                
            })
            const data = await result.save()
            res.status(200)
                .json({ status: "SUCCESS", message: " CATEGORY INSERT SUCCESSFULL", data })
        } catch (error) {
            console.log(error)
            res.status(500).json({error:error});
        }
    }
    static DisplayCategory = async (req, res) => {
        try {
            const data = await CategoryModel.find()
            res.status(200).json(data)

        } catch (error) {
            console.log(error)
            res.status(500).json({error:error});
        
        }
    }
    static ViewCategory = async (req, res) => {
        try {
            // const data = await CategoryModel.findById(req.params.id)
            const data = await CategoryModel.findById(req.params.id)
            res.status(200).json(data)

        } catch (error) {
            console.log(error)
            res.status(500).json({error:error});
        
        }
    }
    static EditCategory = async (req, res) => {
        try {
            const { name,icon } = req.body
            const data = await CategoryModel.findByIdAndUpdate(req.params.id, {
               name:name,
               icon:icon
            })
            res.status(200).json(data)

        } catch (error) {
            console.log(error)
            res.status(500).json({error:error});
        
        }
    }

    static deleteCategory = async (req, res) => {
        try {
            
             await CategoryModel.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"Category Delete Successfully"})

        } catch (error) {
            console.log(error)
            res.status(500).json({error:error});
        }
    }
    static CategoryList = async (req, res) => {
        try {
            const { cname } = req.params;
             console.log(cname)
            const categorylist = await JobModel.find({category:cname});
            console.log(categorylist)
            if (!categorylist) {
                return res.status(404).json({ message: "category  not found" });
            }
            res.status(200).json({
                success: true,
                categorylist,
              });
        }catch (error) {
            console.log(error.message);
            res.status(400).json({ status: "failed", message: error.message });
        }
    };



}


module.exports = CategoryController