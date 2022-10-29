const express = require('express');
const app = express();
const router = require('express').Router();
const request = require('request');
const { generateUsername } = require("unique-username-generator");

router.get('/user', async (req, res) => {

    const username = generateUsername("", 0, 15);

    //get random user image 
    var options = {
        uri: 'https://randomuser.me/api/',
        port: app.get('port'),
        method: 'GET',
        json: true
    }

    request(options, function (error, response, body) {

        if (error && response.statusCode !== 200) {
            res.status(400).send({
                status: "error",
                message: error
            })
        } else {
            res.status(200).send({
                status: "success",
                results: {
                    userName: username,
                    userImage: body.results[0].picture.medium
                }
            })
        }
    })

});

module.exports = router