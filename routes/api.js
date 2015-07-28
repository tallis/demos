var redis = require("redis").createClient();

module.exports.controller = function (app) {

    /* POST - Add new drink */
    //  curl -i -X POST -H 'Content-Type: application/json' -d '{"name":"Vodka","quantity":1}' http://localhost:3000/api/v1.0/drink
    app.post('/api/v1.0/drink', function (req, res) {
        // store drinks in database
        redis.hmset("drinks", req.body.name, req.body.quantity, function (err, result) {
            res.status(201).send('Created')
        })
    })

    /* PUT - Add drink quantity */
    //  curl -i -X PUT -H 'Content-Type: application/json' -d '{"name":"Coke","quantity":1}' http://localhost:3000/api/v1.0/drink
    app.put('/api/v1.0/drink', function (req, res) {
        redis.hmget("drinks", req.body.name, function (err, existingQuantity) {
            var newQuantity = parseInt(existingQuantity) + parseInt(req.body.quantity);
            redis.hmset("drinks", req.body.name, newQuantity, function (err, result) {
                res.status(201).send('Created')
            })
        })
    })
}