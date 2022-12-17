const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

const getStoredRestaurants = () => {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

const storeRestaurants = (restaurantData) => {
  fs.writeFileSync(filePath, JSON.stringify(restaurantData));
}

module.exports = {
  getStoredRestaurants,
  storeRestaurants
}