const mongoClient = require('mongodb').MongoClient;
const safeJsonStringify = require('safe-json-stringify');
const express = require('express');
const createStats = require('./modules/createStatistics.js')
const http = require('http');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const createStatsObj = new createStats();

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({
  type: ['application/json', 'text/plain']
}))

app.get('/',async function(req,res){
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  //const items = await connectDB();
  res.send(safeJsonStringify("lala"));
});
app.post('/dataGame',async function(req,res, next){

  console.log(req.body);
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Accept','application/json')
    await next()
  //const items = await connectDB();
  res.send(req.body);
});
app.listen(8080,function(){
  console.log("Started on PORT 8080");
})
/*app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json);

app.get('/',(async function(req, res){
  //console.log(req.body);
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  //const items = await connectDB();
  res.send(safeJsonStringify("lala"));
  })
)

app.post('/sendData',(function(req, res){
  console.log(req);
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Accept','application/json')
  //const items = await connectDB();
  res.send(safeJsonStringify({try : "lol"}));
  //res.end(safeJsonStringify("lol"))
  })
)
app.listen(8080);*/


function connectDB(){
  const url = 'mongodb://localhost/27017';

    return new Promise(function(resolve, reject){

      mongoClient.connect(url,{useNewUrlParser : true}, res = async function(err, client){
        if(err) {
          return console.error('Connection failed, err');
        }

        let db = client.db("config");


        /*for(let i = 0; i < 52; i++){
          let table = { i:  allCardsWithRecursionStringed(3,[])}

        db.collection("try").insertOne(table)
        .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
        .catch(err => console.error(`Failed to insert item: ${err}`))
      }*/
        resolve(createStatsObj.allCardsTable())
        //resolve(/*db.collection("pokerCollection").findOne("value" : )*/"lala")
        client.close();
      });
    })
}
