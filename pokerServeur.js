const mongoClient = require('mongodb').MongoClient;
const safeJsonStringify = require('safe-json-stringify');
const express = require('express');

const http = require('http');
const app = express();

app.get('/',(function(req, res){
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  connectDB().then(function(items){
    res.send(safeJsonStringify(items))
  })
  .catch(function(e){
    console.log("tant pis");
  })
}))
app.listen(8080);


async function connectDB(){
  const url = 'mongodb://localhost/27017';

  try{
    return await new Promise(function(resolve, reject){

      mongoClient.connect(url,{useNewUrlParser : true}, res = function(err, client){
        if(err) {
          return console.error('Connection failed, err');
        }

        let db = client.db("Pokerstats");
        let table = allCardsWithRecursion(1, {value : 0, symbol : "basic", child : null})

        db.collection("pokerCollection").insertOne({"allTheCardsLooped":  table})
        resolve(db.collection("pokerCollection").findOne())
        client.close();
      });
    })
  }
  catch(e){
    console.log("askip une erreur")
  }
}

function allCardsTable(){

  let cards = [];
  const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
  const symbols = ["Clover","Spade","Heart","Diamond"];
  for(const val of values){
    for(const sym of symbols){
      cards.push({value : val, symbol : sym, child : null})
    }
  }
  return cards;
}

function allCardsWithRecursion(nbLoop, card){

  if(nbLoop === 0){
    return card;
  } else {
    card.child = allCardsTable();
    for(const oneCard of card.child){
      oneCard.child = allCardsWithRecursion(nbLoop - 1, oneCard);
    }
  }
  return card;
}
