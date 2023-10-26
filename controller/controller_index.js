const { request, response } = require("express");
const User = require("../model/user");
const Article = require("../model/article");
const Categorie = require("../model/categorie");





const premierPage = class {
  static firstChild = async(req = request, res = response) => {
    
    try {
      const Articles = await Article.find().exec();
      console.log("mes article",Articles)      
     return res.render("index",{articles:Articles});

     } catch (error) {
      console.log(error);
     }
  };

  static secondchild = async (req = request, res = response) => {
    if (req.session.user) {
     try {
      const Articles = await Article.find().exec();
      console.log("mes article",Articles)      
     return res.render("index2",{user:req.session.user,articles:Articles});

     } catch (error) {
      console.log(error);
     }

     
    } else {
      res.redirect('/connexion')
    }
   
  };

  static connexionPage = (req = request, res = response) => {
    if (req.session.user) {
      res.redirect('/index2')
    }else{
      res.render("connexion");
    }
    
  };
  static connexionPagePost = async(req = request, res = response) => {
    console.log('recuperation info user connexio n',req.body);
    const userEmail = req.body.email;
    try {
      const user = await User.findOne({email:userEmail});
      if (!user) {
        console.log(user);
        return res.status(404).render("connexion",{alert:"email  incorrect"});
      } else {
       
       if(req.body.password === user.password){
        let dataUser = {
          nom:user.nom,
          email:user.email,
          numero:user.numero,
          password:user.password,
          id:user._id

        }
      
        req.session.user = dataUser;
        console.log("ma session est :",req.session);
      
       res.redirect('/index2')
       

       
       }else{
        return res.status(404).render("connexion",{alert:"mots de pass incorrect333"});
       }

      }
      
      
    } catch (error) {
      res.status(500).send(error);
    }
  };
  static inscriptionPage = (req = request, res = response) => {
    if (req.session.user) {
      res.redirect('/index2')
    }else{
      res.render("inscription");
    }
    
    console.log('recuperation info user',req.body);
  };
  static inscriptionPagePost = async(req = request, res = response) => {
    console.log('recuperation info user',req.body);
   
    
    const userone = await User.findOne({email:req.body.email}).exec()
    console.log("mon user",userone);
    if (userone) {
      res.render('inscription',{alerte:"l'email existe deja"})
    } else {
      const user = new User(req.body);
    try {

      const saveUser = await user.save();
      res.status(201).redirect('/connexion');
    } catch (error) {
      res.status(400).render("inscription",{alert:error.errors});
      
        // res.status(400).send(error);
       console.log(error.errors);

      
    }
    }
    
  };

  static ProfilPage = (req = request, res = response) => {
    if (req.session.user) {
      
      return res.render("profil",{user:req.session.user});
    } else {
      res.redirect('/connexion')
    }
  };
  static detailPage =async (req = request, res = response) => {
    if (req.session.user) {

const articleId = req.params.id;
console.log("mon id",articleId);
    try {
      const Articles = await Article.findById(articleId);
      console.log("mon article specifique",Articles);
      
     return res.render("detail",{user:req.session.user, article:Articles});
    } catch (error) {
      res.status(500).send(error);
    }
    } else {
      res.redirect('/connexion')
    }
  };

  static editPage = (req = request, res = response) => {
    
    if (req.session.user) {
      const userId = req.session.user.id;
      console.log("mon premierid");
     res.render("edit",{userid:userId,user:req.session.user});
     
    } else {
      res.redirect('/connexion')
    }
  };



static editPost = async (req = request, res = response) => {
  const userId = req.session.user.id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).send("L'utilisateur n'existe pas");
    res.redirect('/profil');
  } catch (error) {
    res.status(500).send(error);
  }
};









  static contactPage = (req = request, res = response) => {
    if (req.session.user) {
      return res.render("contact",{user:req.session.user});
     } else {
       res.redirect('/connexion')
     }
  };
  static islamiquetPage = async(req = request, res = response) => {
    if (req.session.user) {
      try {
        const Articles = await Article.find().exec();
        console.log("mes article",Articles)      
       return res.render("islamique",{user:req.session.user,articles:Articles});

       } catch (error) {
        console.log(error);
       }
     } else {
       res.redirect('/connexion')
     }
  };
  
  static sportiftPage = async (req = request, res = response) => {
    if (req.session.user) {
      try {
        const Articles = await Article.find().exec();
        console.log("mes article",Articles)      
       return res.render("sportif",{user:req.session.user,articles:Articles});
       } catch (error) {
        console.log(error);
       }
     } else {
       res.redirect('/connexion')
     }
  };

  static politiquePage = async (req = request, res = response) => {
    if (req.session.user) {
      try {
        const Articles = await Article.find().exec();
        console.log("mes article",Articles)      
       return res.render("politique",{user:req.session.user,articles:Articles});
  
       } catch (error) {
        console.log(error);
       }
     } else {
       res.redirect('/connexion')
     }
  };

  static categoriePage = (req = request, res = response) => {
      res.render("categorieForm");
  };
  
  static articlePage = (req = request, res = response) => {
      res.render("articleForm");
  };

  static articlePagePost = async  (req = request, res = response) => {
      //req.body.image =req.protocol +"://" + req.get('host')+"/"+req.file.path;
      req.body.image = req.file.path
      console.log(req.body);
      const Articles = new Article(req.body);
      
      console.log(req.file);
      try {
        const saveArticles = await Articles.save();
        res.status(201).redirect('/articleForm');
      } catch (error) {
        res.status(400).render("articleForm",{alert:"un problemme est survenue"}); 
      }
  };

  static panierPage = (req = request, res = response) => {
    if (req.session.user) {
      return res.render("panier",{user:req.session.user});
    }else{
      res.redirect("/connexion");
    }
    
  };

  static deconnexionPage = (req = request, res = response) => {
  req.session.destroy()
  res.redirect('/connexion');
  };
};
module.exports = premierPage;
