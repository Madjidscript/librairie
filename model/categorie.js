const mongoose = require('mongoose')
const validator = require('validator')


const Categorie = mongoose.model("Categorie",{
    categorie:{type:String,require:true}
})
module.exports= Categorie       
