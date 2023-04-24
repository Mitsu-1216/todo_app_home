const express = require('express');
const router = express.Router();
// knexeを利用
const knex = require("../db/knex");

//select文を書く
router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    res.render('user', {
        title: 'user★',
        isAuth: isAuth
    });
});

router.post('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    const username = req.body.username;
    const password = req.body.password;

    knex("users")
        .select("*")
        .then((results) => {
            res.render("user", {
                title: "user",
                results:results,
                isAuth: isAuth,
            });        
        })
        .catch(function (err) {
            console.error(err);
            res.render("user", {
                title: "user",
                isAuth: isAuth,
                errorMessage: [err.sqlMessage],
            });
        });
});

module.exports = router;