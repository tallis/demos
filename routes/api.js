var redis = require("redis").createClient();

module.exports.controller = function (app) {

    /* POST - Add new drink */
    //  curl -i -X POST -H 'Content-Type: application/json' -d '{"name":"Vodka","quantity":1}' http://localhost:3000/api/v1.0/drink

    /* PUT - Add drink quantity */
    //  curl -i -X PUT -H 'Content-Type: application/json' -d '{"name":"Coke","quantity":1}' http://localhost:3000/api/v1.0/drink

}