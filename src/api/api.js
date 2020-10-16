const axios = require('axios');
const { Product } = require('../model/Product');
const { Category } = require('../model/Category');

class ProductApiClient {
    constructor(url) {
        this.url = url
    }

    async getProduct(id) {
        return axios.get(`${this.url}/products/${id}`).then(r => new Product(r.data.id, r.data.name, r.data.type));
    }
}

class CategoryApiClient {
    constructor(url) {
        this.url = url
    }

    async getCategory(id) {
        return axios.get(`${this.url}/category/${id}`).then(r => new Category(r.data.id, r.data.name));
    }
}

module.exports = {
    ProductApiClient,
    CategoryApiClient
}
