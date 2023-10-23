const validator = require('validator')
const mongoose = require('mongoose')


const User = mongoose.model('User',{
    nom:{type:String,require:true},

    email:{type:String,require:true,
    validate(v){
        if(!validator.isEmail(v)) throw new Error('entrer un bon email')
     }
    },
    password:{type:String,require:true,
     validate(v){
        if(!validator.isLength(v,{min:4, max:20}))
        throw new Error('le mot de passe doit etre entre 4 et 20');
     }
    },
    numero:{type:String,require:true,
    validator(v){
      if(!validator.isLength(v,{min:10, max:10}))
      throw new Error('la taille du contact doit etre 10')
    }
    }
})

module.exports =User