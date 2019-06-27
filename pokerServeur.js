const mongoClient = require('mongodb').MongoClient;
const safeJsonStringify = require('safe-json-stringify');
const express = require('express');

const http = require('http');
const app = express();

app.get('/',(async function(req, res){
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const items = await connectDB();
  res.send(safeJsonStringify(items));
}))
app.listen(8080);


function connectDB(){
  const url = 'mongodb://localhost/27017';

    return new Promise(function(resolve, reject){

      mongoClient.connect(url,{useNewUrlParser : true}, res = async function(err, client){
        if(err) {
          return console.error('Connection failed, err');
        }

        let db = client.db("Pokerstats");
        //let table = allCardsWithRecursion(3, {value : 0, symbol : "basic", child : 1})

        db.collection("pokerCollection").insertOne({"allTheCardsLooped":  allCardsWithRecursionStringed(1, "")})
        .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
        .catch(err => console.error(`Failed to insert item: ${err}`))

        resolve(/*db.collection("pokerCollection").findOne("value" : )*/"lala")
        client.close();
      });
    })
}

function allCardsTable(){

  let cards = [];
  const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
  const symbols = ["Clover","Spade","Heart","Diamond"];
  for(const val of values){
    for(const sym of symbols){
      cards.push({value : val, symbol : sym, child : []})
    }
  }
  return cards;
}

function allCardsWithRecursion(nbLoop, card){

  if(nbLoop == 0){
    return null;
  } else {
    card.child = allCardsTable();
    for(const oneCard of card.child){
      allCardsWithRecursion(nbLoop - 1, oneCard);
    }
  }
  return card;
}

function allCardsTableStringed(currentString = ""){
  let cards = [];
  const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
  const symbols = ["C","S","H","D"];
  for(const val of values){
    for(const sym of symbols){
      cards.push(currentString + val + sym)
    }
  }
  return cards;
}
function allCardsWithRecursionStringed(nbLoop, currentString){

  if(nbLoop == 0){
    let a = [currentString]
    console.log(a)
    return a
  } else {
    let newTable = allCardsTableStringed(currentString);
    for(const oneCard in newTable){
      newTable[oneCard] = allCardsWithRecursionStringed(nbLoop - 1, newTable[oneCard]);
    }
    console.log(newTable)
    return [].concat(newTable[0]);
  }
}
