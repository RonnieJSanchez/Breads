const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");
const Baker = require('../models/baker.js')
//create
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.create(req.body);
  res.redirect("/breads");
  
});

//index
breads.get("/", (req, res) => {
  Bread.find().then((foundBreads) => {
    res.render("index", {
      breads: foundBreads,
      title: "Index Page",
    });
  });
});

//new
breads.get("/new", (req, res) => {
  Baker.find()
  .then(foundBakers => {
    res.render('new', {
      bakers : foundBakers
    })
  })

});

//Show
breads.get("/:id", (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
    .then((foundBread) => {
      const bakedBy = foundBread.getBakedBy()
      console.log(bakedBy)
      res.render("show", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      res.send("404");
    });
});

//edit form
breads.get("/:id/edit", (req, res) => {
  Baker.find().then((foundBakers) => {
    Bread.findById(req.params.id).then((foundBread) => {
      console.log(foundBread);
      res.render("edit", {
        bread: foundBread,
        bakers: foundBakers
      });
    });
  });
});

//delete
breads.delete("/:id", (req, res) => {
  Bread.findOneAndDelete(req.params.id).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

//update
breads.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBread) => {
      console.log(updatedBread);
      res.redirect(`/breads/${req.params.id}`);
    }
  );
});

module.exports = breads;