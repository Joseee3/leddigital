// main.js

import { renderFeaturedCategories } from './categories.js';
import { renderSales } from './offers.js';
import { loadProducts } from './load_products.js';

document.addEventListener('DOMContentLoaded', function () {
    loadProducts(renderFeaturedCategories, renderSales);
});