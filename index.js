const csv = require("csvtojson");
const fs = require("fs");
const matchesPlayedPerYear = require("./functions/matchesPlayedPerYear");
const matchesWonLifetime = require("./functions/matchesWonLiftime");
const extraRuns = require("./functions/extraRuns");
const economicalBowler = require("./functions/ecoonomicalBowler");
const avgRuns= require("./functions/avgRuns");

const DELIVERY_FILE_PATH = "./csv_data/deliveries.csv"
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const JSON_FILE_PATH = "./public/data.json"

function main(){
    csv().
    fromFile(MATCHES_FILE_PATH).
    then(matches=>{

        csv().fromFile(DELIVERY_FILE_PATH).
        then(deliveries=>{
        let res = {};
        res["matchesPlayedPerYear"] = matchesPlayedPerYear(matches);
        res["matchesWonLifetime"] = matchesWonLifetime(matches);
        res["extraRuns"]= extraRuns(matches,deliveries);
        res["economicalBowler"]=economicalBowler(matches,deliveries);
        res["avgRuns"] = avgRuns(deliveries,matches);
        // extraRuns(matches,deliveries);
        saveData(res);
    })});
}

function saveData(result) {
    const jsonString = JSON.stringify(result);
    fs.writeFile(JSON_FILE_PATH, jsonString, "utf8", err => {
      if (err) {
        console.error(err);
      }
    });
  }

main();