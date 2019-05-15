const axios = require('axios');
var fs = require("fs");

axios.defaults.timeout = 7000;

setInterval(function () {

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    axios.get('http://localhost:3000/browse/1')
        .then(response => {
            console.log(`Metabase is up! on ${datetime}`);
        })
        .catch(error => {

            if (error.code === "ECONNABORTED") {
                var data = "Metabase was down on:" + datetime;
                console.log(`Metabase is down! on ${datetime}`);

                fs.appendFile('log.txt', '\n' + data, (err) => {
                    if (err) throw err;
                });

                var child_process = require('child_process');

                child_process.exec('start-metabase.bat', function (error, stdout, stderr) {
                    console.log(stdout);
                });
            }


        });


}, 8000);



