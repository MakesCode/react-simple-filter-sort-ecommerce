const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function applyFilters(products, { query, sort, colors }) {

  const filteredProducts = products.filter(
    (product) => {
      if (query) return product.name.toLowerCase().includes(query?.toLowerCase())
      if (colors) return colors.split(',').includes(product.color)
      return product
    }
  ).sort((a, b) => {
    switch (sort) {
      case 'priceDesc':
        return a.price - b.price
      case 'priceAsc':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return b
    }
  })

  return filteredProducts
}

app.get('/items', (req, res) => {
  const query = req.query;

  setTimeout(() => {
    res.json(applyFilters(data, query));
  }, 150);
});

app.listen(3001, () => {
  console.info('server listening on: 3001');
});