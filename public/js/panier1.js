 
const counter = JSON.parse(localStorage.getItem("librairies"));
const cont = document.querySelector("#count");
console.log(counter.length);
cont.textContent = counter === null ? 0 : counter.length;

let boutons = document.querySelectorAll(".btn");
 boutons.forEach((el)=>{
    el.addEventListener('click',(e)=>{
        e.preventDefault()
        
        let librairie = localStorage.getItem("librairies");
          let enfant = e.target;
          
          let parent = document.querySelector(".carre");
          let img = document.querySelector(".imgArticle").src;
          let titre = document.querySelector(".titre").textContent;
          console.log(titre);
          let prix = parent.querySelector(".price").textContent;
        
          console.log(parent);
          console.log(img);
          console.log(titre);
          console.log(prix);
        
          let article = {
            titre: titre,
            prix: prix,
            image: img
          };
          console.log(article);
        
          if (librairie === null) {
            librairie = [];
            librairie.push(article);
            localStorage.setItem("librairies", JSON.stringify(librairie));
            window.location.reload();
          } else {
            librairie = JSON.parse(librairie);
            librairie.push(article);
            localStorage.setItem("librairies", JSON.stringify(librairie));
            window.location.reload();
            console.log(librairie);
          }
        });
     })

