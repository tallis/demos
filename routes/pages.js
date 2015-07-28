var redis = require("redis").createClient();

module.exports.controller = function (app) {
    /* GET index page */
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Veniam Tech Away | Socket.io example'
        })
    });


}