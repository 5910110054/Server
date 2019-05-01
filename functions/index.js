const functions = require('firebase-functions');

var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var firebase = require('firebase');

var cors = require('cors');

app.use(cors())

var config = {
    apiKey: "AIzaSyA69dDQ4mak2zAlBUQYaKnJN-qWHmmRF1Y",
    authDomain: "keemjung-a2bd5.firebaseapp.com",
    databaseURL: "https://keemjung-a2bd5.firebaseio.com",
    projectId: "keemjung-a2bd5",
    storageBucket: "keemjung-a2bd5.appspot.com",
    messagingSenderId: "163326695251"
  };
  firebase.initializeApp(config);

exports.api = functions.https.onRequest(app)


router.route('/guitars')
    .post(function (req, res) { 

        guitar_id = req.body.id;
        guitar_name = req.body.name;
        firebase.database().ref('guitars/' + guitar_id).set({
            id: guitar_id,
            name: guitar_name  
        });
        res.json({ message: '!! Created !!' });
    });

router.route('/guitars')
    .get(function (req, res) {
        var guitar_path = firebase.database().ref('guitars/');
        guitar_path.on('value', function (snapshot) {
        res.send(snapshot.val())
        });
    });

router.route('/guitars/:guitar_id')
    .get(function (req, res) {
        var id_guitar = req.params.guitar_no;
        var guitar_set_path = firebase.database().ref('/guitars/' + id_guitar)
        guitar_set_path.once('value', function (snapshot) {
        res.send(snapshot.val())
        });
    });

แ
        app.use(bodyParser.json(), router);
        app.listen(8000);