const express = require('express');
const router = express.Router();
// knexeを利用
const knex = require("../db/knex");

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    const default_taskid = req.query.default_taskid;
    const default_task = req.query.default_task;
    const default_date = req.query.default_date;
    const default_time = req.query.default_time;

    res.render('modify', {
        title: '★modify★',
        default_taskid: default_taskid,
        default_task :default_task,
        default_date :default_date,
        default_time :default_time,
        isAuth: isAuth
    });
});

router.post('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    const modify_taskid = req.body.modify_taskid;
    const modify_task = req.body.modify_task;
    const modify_date = req.body.modify_date;
    const modify_time = req.body.modify_time
    
    knex("tasks")
        .where({ "id": modify_taskid })
        .update({ content: modify_task,date:modify_date,time:modify_time })
        .then(function () {
            res.redirect('/')
        })
        .catch(function (err) {
            console.error(err);
            res.render('index', {
                title: 'ToDo App',
                isAuth: isAuth,
            });
        });
});

module.exports = router;