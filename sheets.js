var google = require('googleapis');
var googleAuth = require('google-auth-library');

function Sheets() { }
// This is the only public function you need to implement
Sheets.prototype.getData = function getData(req, callback) {
  var geojson = {
    type: 'FeatureCollection',
    features: []
  }
  geojson.ttl = 60 * 60;
  geojson.metadata = {
      name: "Students",
      description: "Collaborate in google docs, analyse in ArcGIS"
  }
  var sheets = google.sheets('v4');
  // https://docs.google.com/spreadsheets/d/1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI/edit?usp=sharing
  sheets.spreadsheets.values.get({
    auth: "AIzaSyAVwDBIic7kq3DYrN4cYQxaq2kHmYirWOM",
    spreadsheetId: '1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI',
    range: 'Park Cleanup!A2:H',
  }, ((err, response) => {
    if (err) {
      console.log('Google API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      var oid = 1;
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        row.OBJECTID = oid; //Need to add a unique numeric objectid field
        var feature = this.translate(row);
        geojson.features.push(feature);
        oid++;
      }
      callback(null, geojson)
    }
  }));
}
Sheets.prototype.translate = function translate(row) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [parseInt(row[6]), parseInt(row[7])] //Make sure coordinates are numbers not strings
    },
    properties: {
      OBJECTID: row.OBJECTID,
      Name: row[0],
      Gender: row[1],
      Level: row[2],
      State: row[3],
      Major: row[4],
      Interest: row[5]
    }
  }
}
module.exports = Sheets