const fs = require("fs");
const path = require("path");
const csvFilePath = path.join(__dirname, "./maps-info.csv");
const csv = require("csvtojson");
const writeFileName = "./maps-info.json";

async function convertCsvToJson() {
    jsonArray = await csv().fromFile(csvFilePath);

    // Change the name of the columns in the csv file.
    jsonArray.forEach(function (element) {
        element.lat = element._Latitude;
        element.lng = element._Longitude;
        // Remove the old columns.
        delete element._Latitude;
        delete element._Longitude;
    });

    return jsonArray;
}

async function printJsonToFile() {
    jsonArray = await convertCsvToJson();

    // Write the jsonArray to a file.
    fs.writeFile(writeFileName, JSON.stringify(jsonArray), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

printJsonToFile();
