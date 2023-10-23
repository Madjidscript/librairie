const app = require('express');
const User = require('../model/user');


app.post("/todos", async (req, res, next) => {
  const user = new User(req.body);
  try {
    const saveUser = await user.save();
    res.status(201).send(saveUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

//recuperer les utilisateur
app.get("/users", async (req, res, next) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//recuperer un utilisateur pas sont id
app.get("/users/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("user nexiste pas");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//modifier un utilisateur pas sont id
app.patch("/users/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).send("user nexiste pas");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
//supprimer un utilisateur pas sont id
app.delete("/users/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).send("user nexiste pas");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
