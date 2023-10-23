const mongoose = require('mongoose')
const validator = require('validator')


const Article = mongoose.model("Article",{
    image:{type:String,require:true},
    title:{type:String,require:true},
    prix:{type:Number,require:true},
    description:{type:String,require:true},
    categorie:{type:String,require:true}
})
module.exports= Article       
