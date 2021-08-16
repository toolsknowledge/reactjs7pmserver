//import modules
//require() is the function, used to import the modules
const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const bodyparser = require("body-parser");


//rest object
const app = express();
//where "app" is the rest object
//by using "app" object we can develop GET,POST,PUT,DELETE,......



//enable the cors policy
app.use( cors() );



//MIME Type
app.use(bodyparser.json());


//create the reference variable to connect to mongodb database
const ashokIT = mongodb.MongoClient;
//where "ashokIT" is reference variable to connect to mongodb database


//create the POST Request
app.post("/login",(req,res)=>{
    ashokIT.connect("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/login?retryWrites=true&w=majority",(err,connection)=>{
        if(err) throw err;
        else{
            const db = connection.db("login");
            db.collection("login_tbl")
            .find({"email":req.body.email,"password":req.body.password})
            .toArray((err,array)=>{
                if(err) throw err;
                else{
                    if(array.length>0){
                        res.send({"login":"success"});
                    }else{
                        res.send({"login":"fail"});
                    }
                }
            })
        }
    });
});


//assign the port number
app.listen(8080,()=>{
    console.log("server listening the port number 8080");
});

