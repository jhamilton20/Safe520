const express = require("express");
const exphbs = require("express-handlebars");
const request = require("request");
const app = express();
const mysql = require("mysql")
const connection = require("./config/connection.js")
let path = require("path")
let port = process.env.port || 8080;
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static('public'))

// map route to dynamically create map based on dataset
app.get("/"), function(req, res){
    
    let toRedir = path.join(__pathname + "/login.html")
    res.send("test")
}

app.get("/map", function(req, res){

    //numResults is used to decide how many markers to populate the map with
    let numResults = req.query.number || 350;

    let year = req.query.year;
    let yearIndex;
    let queryArray = [
        "https://publicgis.tucsonaz.gov/open/rest/services/OpenData/OpenData_PublicSafety/MapServer/54/query?where=1%3D1&outFields=X,Y,STATUTDESC&outSR=4326&f=json",
        "https://publicgis.tucsonaz.gov/open/rest/services/OpenData/OpenData_PublicSafety/MapServer/48/query?where=1%3D1&outFields=X,Y,STATUTDESC&outSR=4326&f=json",
        "https://publicgis.tucsonaz.gov/open/rest/services/OpenData/OpenData_PublicSafety/MapServer/40/query?where=1%3D1&outFields=X,Y,STATUTDESC&outSR=4326&f=json",
        "https://publicgis.tucsonaz.gov/open/rest/services/OpenData/OpenData_PublicSafety/MapServer/33/query?where=1%3D1&outFields=X,Y,STATUTDESC&outSR=4326&f=json",
        "https://publicgis.tucsonaz.gov/open/rest/services/OpenData/OpenData_PublicSafety/MapServer/32/query?where=1%3D1&outFields=X,Y,STATUTDESC&outSR=4326&f=json",
        "https://publicgis.tucsonaz.gov/open/rest/services/OpenData/OpenData_PublicSafety/MapServer/31/query?where=1%3D1&outFields=X,Y,STATUTDESC&outSR=4326&f=json"
    ]
    //take year and turn it into an index to take the proper URL from the data array
    if (year == 2020){
        yearIndex = 0;
    }
    
    else if (year == 2019){
        yearIndex = 1;
    }
    
    else if (year == 2018){
        yearIndex = 2;
    }
    
    
   else if (year == 2017){
        yearIndex = 3;
    }

   else if (year == 2016){
        yearIndex = 4;
    }
    else{
        yearIndex = 5;
    };
    let queryURL = queryArray[yearIndex]
    request(queryURL, function(err, data){
        if (err){
            console.log(err);
        };
        let body = JSON.parse(data.body);
        //empty array to be populated with incidents
        let features = []
        
        //iterate through json to grab incidents that have geodata and push to the array
        for (let i = 0; i < numResults; i++){
            // checks if one of the coordinates is > -999 to filter out NaN results
            if (body.features[i].geometry.y > -999){
                features.push(body.features[i])
            }
        };
        
        //console.log(features)
        //object with features array to pass to handlebars
        let handlebarsObject = {
            features: features
        };
        //render map with featurs from array to user
        res.render("map", handlebarsObject);
    })
});

app.post("/newUser",function(req,res){
    //console.log(req)
    let user = req.query.username
    let email = req.query.email
    let defURL = ""
    let queryString;
    hash = bcrypt.hashSync(req.query.password, 10) 

    queryString = "insert into table logins(username, email, password) values (" + user + ", " + email + ", " + hash + ");"
    console.log(queryString)
    connection.query(queryString).then(function(err, result){
        if (err){
            console.log(err)
        }else{
            defURL = "/map?year=2019&number=300"
            }
        res.send(defURL)
    })    
})

app.post("/assess", function(req,res){
    let user = req.query.username
    //let email = req.query.email
    let defURL = ""
    hash = bcrypt.hashSync(req.query.password, 10)  
    let queryString = "select * from table logins where username =" + user +"AND password = "+ hash + " ;"
    console.log(queryString)
    connection.query(queryString).then(function(err, data){
        console.log(data)
    })
})



app.listen(port);
console.log("app listening on port " + port);