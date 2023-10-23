const { request, response } = require("express");
const User = require("../model/user");
const Article = require("../model/article");
const Categorie = require("../model/categorie");





const premierPage = class {
  static firstChild = (req = request, res = response) => {
    res.render("index");
  };

  static secondchild = (req = request, res = response) => {
    if (req.session.user) {
     return res.render("index2",{nom:req.session.user.nom,email:req.session.user.email,numero:req.session.user.numero});
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
          numero:user.numero
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
    const user = new User(req.body);
    try {
      const saveUser = await user.save();
      res.status(201).redirect('/connexion');
    } catch (error) {
      res.status(400).render("inscription",{alert:error.errors});
      
        // res.status(400).send(error);
       console.log(error.errors);

      
    }
  };

  static ProfilPage = (req = request, res = response) => {
    if (req.session.user) {
      
      return res.render("profil",{nom:req.session.user.nom,email:req.session.user.email,numero:req.session.user.numero});
    } else {
      res.redirect('/connexion')
    }
  };

  static editPage = (req = request, res = response) => {
    if (req.session.user) {
     res.render("edit");
    } else {
      res.redirect('/connexion')
    }
  };

  static contactPage = (req = request, res = response) => {
    if (req.session.user) {
      return res.render("contact",{nom:req.session.user.nom,email:req.session.user.email,numero:req.session.user.numero});
     } else {
       res.redirect('/connexion')
     }
  };
  static islamiquetPage = (req = request, res = response) => {
    if (req.session.user) {
      return res.render("islamique",{nom:req.session.user.nom,email:req.session.user.email,numero:req.session.user.numero});
     } else {
       res.redirect('/connexion')
     }
  };
  static sportiftPage = (req = request, res = response) => {
    
    if (req.session.user) {
      
      return res.render("sportif",{nom:req.session.user.nom,email:req.session.user.email,numero:req.session.user.numero});
     } else {
       res.redirect('/connexion')
     }
  };
  static politiquePage = (req = request, res = response) => {
    if (req.session.user) {
      return res.render("politique",{nom:req.session.user.nom,email:req.session.user.email,numero:req.session.user.numero});
     } else {
       res.redirect('/connexion')
     }
  };
  static categoriePage = (req = request, res = response) => {
      res.render("categorieForm");
  };
  static categoriePagePost =async (req = request, res = response) => {
      const categories = new Categorie(req.body);
    try {
      const saveCategories = await categories.save();
      res.status(201).redirect('/categorieForm');
    } catch (error) {
      res.status(400).render("categorieForm",{alert:"un problemme est survenue"}); 
    }
  };
  static articlePage = (req = request, res = response) => {
      res.render("articleForm");
  };

  static articlePagePost = async  (req = request, res = response) => {
      
      const Articles = new Article(req.body);
      try {
        const saveArticles = await Articles.save();
        res.status(201).redirect('/articleForm');
      } catch (error) {
        res.status(400).render("articleForm",{alert:"un problemme est survenue"}); 
      }
  };
  static deconnexionPage = (req = request, res = response) => {
  req.session.destroy()
  res.redirect('/connexion');
  };
};
module.exports = premierPage;
