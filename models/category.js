const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    
  },
 
    icon: {
      type: String,
      required: true
     }
});

const CategoryModel = mongoose.model("category", CategorySchema);
module.exports =CategoryModel