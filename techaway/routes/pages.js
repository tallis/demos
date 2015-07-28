var redis = require("redis").createClient();

module.exports.controller = function (app) {
    /* GET index page */
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'The index page!'
        })
    });

    /* GET drinks page. */
    app.get('/drinks', function (req, res) {
        redis.hgetall("drinks", function (err, result) {
            console.log(result)
            res.render('drinks', {
                title: 'All your available drinks',
                drinks: result
            })
        })
    })
}