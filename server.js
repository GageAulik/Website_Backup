    // server.js
    // This is an express server app running on the web server.
    // This copy of server is for the Game site.
var express = require("express");
var app = express();

    // Serve any static files from the public dir
app.use(express.static("public"));
app.use(express.json());

    // The mysql object allows one to talk to a running
    // instance of a MySQL server.
var mysql = require("mysql");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
   extended: false
}));


app.use(bodyParser.json());



    // Creates our /names endpoint. This endpoint will respond with a
    // json representation of the Game names. This is an array of objects,
    // This endpoint holds the creator and the name of the game allowing users to see
    // the information on each title, it also shows the amount of players per platform
app.get("/names", getGameNames);
function getGameNames( req, res) {
    console.log("getGameNames called");


    // The connection object allows one to connect to
    // the given MySQL server (in this case on localhost)
    // with the given user and password, looking at the
    // specified database.
    var conn = mysql.createConnection( {
        host: 'localhost',
        user: 'aulikm',
        password: '$395Mi569',
        database: 'AulikGames',
            });
        console.log("connection made");
    // Calling the connect function causes the connection
    // object (in the variable 'conn') to actually connect
    // with the credentials specified.
    conn.connect( function( err) {
        if( err) {
        }
        else {
        }});
    // Here is the sql query that we want to run.
    var sql = "select * from games";

    // this function is to be run when the query returns a result.
    function selectNameFromGame(err,rows) {
        console.log("selectNameFromGame called");
        if( err) {
        }
        else {
            res.send( JSON.stringify( rows));
        }
    }

    // this statement actually runs the query on mysql.
    conn.query( sql, selectNameFromGame);

    // this statement will close the connection.
    conn.end();

}

    // Creates our /date endpoint. This endpoint will respond with a
    // json representation of the Game requested by the 'Game' parameter.
    // This endpoint will also include a inner join with our names endpoint
    // this will be called in our games.js file to allow all game data to
    // appear properly on the page when requested.


app.get("/date", getGameData);
function getGameData( req, res) {
    // Grab the parameter to this query, the Game name.
    let requestedGame = req.query.games;
    console.log("getGameData called with Game=" + req.query.games);


    // Create and connect a connection to the MySQL server.
    var conn = mysql.createConnection( {
        host: 'localhost',
        user: 'aulikm',
        password: '$395Mi569',
        database: 'AulikGames'
            });
    conn.connect( function( err) {
        if( err) {
        }
        else {
        }});

    // Here is the sql query that we want to run.
    // Uses inner join to pull from the names database
    // and then is called by onSelect function in games.js
    // This is the required inner join that pulls data from the other database and is called
    // within our games.js
    // This call also inner joins another table called Genres
    //genres will line up with the genres of the games that we have selected

    var sql = "SELECT *, DATE_FORMAT(dates, '%m/%d/%Y') AS datetwo FROM games INNER JOIN date ON games.ID = date.ID INNER JOIN genres ON games.ID = genres.ID where name = \"" + requestedGame + "\"";

    // This is a second innerjoin for the genre of the games


    // Run the query on mysql.
    conn.query(sql, function (err,rows) {
            console.log("selectDataFromGame called");
            if( err) {
                // send back an error code in result
            }
            else {
                // Send back the rows (an array of row objects) as a JSON string
                res.send( JSON.stringify( rows));
            }
        }
      );


    // Close the connection.
    conn.end();
}




app.post('/add', sendStuff, bodyParser, );
function sendStuff (req, res) {
    // get data from forms and add to the table called user..


    console.log(req.body);
    var conn = mysql.createConnection( {
       host: 'localhost',
       user: 'aulikm',
       password: '$395Mi569',
       database: 'AulikGames'
            });

    //creatinga  variable for req.body
    var reqBody = req.body;
    //each of these variables will be called to fill out and add things into our sql
    var title = req.body.name;
    var players = reqBody.players;
    var studio = reqBody.studio;
    var genres = reqBody.genres;
    var date = reqBody.date;


    //each call inserts data from the game
    var sqlOne = "INSERT INTO games(name,players,studio) VALUES('"+ title +"','"+ players +"','"+ studio +"');"
    var sqlTwo = "INSERT INTO genres(genretype) VALUES('"+ genres +"');"
    // var sqlThree = "INSERT INTO date (dates) VALUES ('"+ date +"');"
    // var sqltwo = 'INSERT INTO games(name,players,studio) VALUES(\""+ names +"\"",\""+req.body.players+"\"",\""+req.body.studio+"\"");INSERT INTO genres(genretype) VALUES(\""+req.body.genres+"\"");INSERT INTO date(date) VALUES(\""+req.body.date+"\"");'


    conn.query(sqlOne, sqlTwo, function ( rows) {

    console.log("1 record successfully inserted into db:");
    res.end( JSON.stringify( rows));

})
};


    // Start the web server running on port 3040
app.listen(3040);
