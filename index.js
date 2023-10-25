require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const router_index = require("./router/route_index");
const { connectdb } = require("./services/mongoose"); 
const session = require('express-session')




app.use(session({
    secret: 'yaya', // Une chaîne secrète pour signer les cookies de session
    resave: false, // Ne pas enregistrer la session à chaque requête
    saveUninitialized: true, // Enregistrer une session vide pour les nouveaux utilisateurs
}));


connectdb().catch((e)=>console.log(e))

const port =process.env.port || 3000;
app.use('/uploads',express.static('./uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", router_index);




 app.listen(port, () => {
  console.log(`le serveur est active sur le port ${port}`);
});
