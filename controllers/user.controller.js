const express = require('express');
const db = require('../db');
const shortid = require('shortid');

function index(req,res){
    res.render('users/index',{users: db.get('users').value() });
}

function search(req,res){
    var name = req.query.name;
    var users = db.get('users').value();
    var matchedUsers = users.filter(user=>{
        return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    })
    res.render('users/index',{users:matchedUsers});
}

function getCreate(req,res) {
    res.render('users/create');
}

function view(req,res) {
    var id = req.params.id;
    var user = db.get('users')
                .find({ id: id })
                .value()
    res.render('users/view',{user:user});
}

function postCreate(req,res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    db.get('users')
    .push(req.body)
    .write()
    res.redirect('/users');
}

module.exports = {
    index : index,
    search : search,
    getCreate : getCreate,
    view : view,
    postCreate : postCreate
}