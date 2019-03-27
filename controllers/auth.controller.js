const express = require('express');
const db = require('../db');
const md5 = require('md5');
function login(req,res) {
    res.render('auth/login');
}

function postLogin(req,res) {
    let email = req.body.email;
    let password = md5(req.body.password);

    let user = db.get('users').find({email: email}).value();
    
    if(!user){
        res.render('auth/login',{
            erros : [
                'User does not exist'
            ]
        });
        return;
    }

    if(user.password !== password){
        res.render('auth/login',{
            erros : [
                'Wrong password'
            ]
        });
        return;
    }

    res.cookie('userId',user.id, {
        signed : true
    });
    res.redirect('/users');
}

module.exports = {
    login : login,
    postLogin : postLogin
}