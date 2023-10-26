const express = require("express");
const premierPage = require("../controller/controller_index");
const upload = require("../middlewares/multer");
const router = express.Router();




router.get("/",  premierPage.firstChild);
router.get("/index2", premierPage.secondchild);
router.get("/connexion", premierPage.connexionPage);
router.post("/connexion",premierPage.connexionPagePost)
router.get("/inscription", premierPage.inscriptionPage);
router.post('/inscription',premierPage.inscriptionPagePost)
router.get("/profil", premierPage.ProfilPage);
router.get("/detail/:id",premierPage.detailPage)
router.get("/profil/editer", premierPage.editPage);
router.post("/profil/editer", premierPage.editPost);
router.get("/contact", premierPage.contactPage);
router.get("/panier", premierPage.panierPage);
router.get("/islamique", premierPage.islamiquetPage);
router.get("/politique", premierPage.politiquePage);
router.get("/sportif", premierPage.sportiftPage);
router.get("/categorieForm", premierPage.categoriePage);
router.get("/articleForm", premierPage.articlePage);
router.post("/articleForm", upload.single('image'),premierPage.articlePagePost);
router.get("/deconnexion", premierPage.deconnexionPage);

module.exports = router;
