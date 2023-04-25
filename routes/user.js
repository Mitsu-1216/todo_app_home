const express = require('express');
const router = express.Router();
// knexeを利用
const knex = require("../db/knex");

//select文を書く
router.get('/', function (req, res, next) {

    res.render('user', {
        title: 'user★',
    });
});

router.post('/', function (req, res, next) {

    knex("users")
        .select("*")
        .then((results) => {
            res.render("user", {
                title: "user",
                results:results,
            });        
        })
        .catch(function (err) {
            console.error(err);
            res.render("user", {
                title: "user",
               errorMessage: [err.sqlMessage],
            });
        });
});

module.exports = router;