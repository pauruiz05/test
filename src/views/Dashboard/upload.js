const express = require('express'),
    app = express(),
    http = require("http").Server(app).listen(80),
    upload = require("express-fileupload");
    
   
app.use(upload())

console.log("Server Started!")
app.get("/",function(req, res){
    res.sendFile(__dirname+"/Dashboard.js");
})
app.post("/",function(req, res){
    if(req.files){
        var file = req.files.filename,
            filename = file.name;
        file.mv("./upload/"+filename,function(err){
            if(err){
                console.log(err)
                res.send("error occured")
            }
            else{
                res.send("Done!")
                var csv = require('fast-csv');
                csv
                .fromString(req.files.filename.data.toString('utf8'))
                .on("data", function(data){
                    console.log(data);
                })
                .on("end", function(){
                    console.log("done");
                });
            }
        })
    }
})

   