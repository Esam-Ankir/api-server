"use strict";
const express = require("express");
const { ClothesTable } = require("../models/index");
const ClothesRouter = express.Router();
// const validator = require('../middleware/validator');

ClothesRouter.get("/clothes", getClothes);
ClothesRouter.get("/clothes/:id", getOneClothes);
ClothesRouter.post("/clothes", createClothes);
ClothesRouter.put("/clothes/:id", updateClothes);
ClothesRouter.delete("/clothes/:id", deleteClothes);
// app.get("/clothe", validator, (req, res) => {getclothe});
async function getClothes(req, res) {
  const allClothes = await ClothesTable.read();
  res.status(200).json(allClothes);
}

async function getOneClothes(req, res) {
  const clothes_id = parseInt(req.params.id);
  let clothesName = await ClothesTable.read(clothes_id);
  res.status(200).json(clothesName);
}

async function createClothes(req, res) {
  let newClothes = req.body;
  let clothes = await ClothesTable.create(newClothes);
  res.status(201).json(clothes);
}

async function updateClothes(req, res) {
  let clothes_id = parseInt(req.params.id);
  let updateClothes = req.body;
  let foundClothes = await ClothesTable.read(clothes_id);
  if (foundClothes) {
    let updatedClothes = await foundClothes.update(updateClothes);
    res.status(201).json(updatedClothes);
  } 
}

async function deleteClothes(req, res) {
  let clothes_id = parseInt(req.params.id);
  let deletedClothes = await ClothesTable.delete(clothes_id);
    res.status(204).json(deletedClothes);
}

module.exports = ClothesRouter;