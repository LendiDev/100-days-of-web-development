const express = require('express');
const uuid = require('uuid');

const { getStoredRestaurants, storeRestaurants } = require('../utils/restaurants-data');

const router = express.Router();

router.get('/restaurants', (req, res) => {
  const restaurants = getStoredRestaurants();

  res.render('restaurants', { numberOfRestaurants: restaurants.length, restaurants: restaurants });
});

router.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;

  const restaurants = getStoredRestaurants();
  const restaurant = restaurants.find((item) => item.id === restaurantId);

  if (restaurant) {
    res.render('restaurant-details', { restaurant });
  } else {
    res.status(404).render('404');
  }
});

router.get('/recommend', (req, res) => {
  res.render('recommend');
});

router.post('/recommend', (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  const restaurants = getStoredRestaurants();
  restaurants.push(restaurant);

  storeRestaurants(restaurants);

  res.redirect('/confirm');
});

router.get('/confirm', (req, res) => {
  res.render('confirm');
});

module.exports = router;