const express = require('express');
const db = require('../db');

function listProduct(req,res) {
    let page = parseInt(req.query.page) || 1;
    let perPage = 9;

    let start = (page - 1 ) * perPage;
    let end = page * perPage;

    let products = db.get('products').value().slice(start,end);
    res.render('products/list',{products:products})
}

module.exports = {
    listProduct : listProduct,
}