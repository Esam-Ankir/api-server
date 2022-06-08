'use strict';
const express = require('express');
const { FoodTable } = require('../models/index');
const foodRouter = express.Router();
// const validator = require('../middleware/validator');

foodRouter.get('/food', getFoods);
// app.get("/food", validator, (req, res) => {getFoods});
foodRouter.get('/food/:id', getOneFood);
foodRouter.post('/food', addOneFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

async function getFoods(req, res) {
  const food = await FoodTable.read();
  res.status(200).json(food);
}
async function getOneFood(req, res) {
  const foodId = parseInt(req.params.id);
  const food = await FoodTable.read(foodId);
  res.status(200).json(food);
}
async function addOneFood(req, res) {
  const newFood = req.body;
  const food = await FoodTable.create(newFood);
  res.status(201).json(food);
}
async function updateFood(req, res) {
  const foodId = parseInt(req.params.id);
  const updateFood = req.body;
  const foundFood = await FoodTable.read(foodId);
  if (foundFood) {
    const updatedFood = await foundFood.update(updateFood);
    res.status(201).json(updatedFood);
  }
}
async function deleteFood(req, res) {
  const foodId = parseInt(req.params.id);
  const deletedFood = await FoodTable.delete(foodId);
  res.status(204).json(deletedFood);
}

module.exports = foodRouter;

