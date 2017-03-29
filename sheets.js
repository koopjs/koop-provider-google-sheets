var google = require('googleapis')
// var googleAuth = require('google-auth-library')

function Sheets () {}

Sheets.prototype.getData = function getData (req, callback) {
  console.log(req.params)
  var sheetId = req.params.host  // 1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI OR 1dK_touGylnTtJBzve2HEwfev_f6JxCpRMb2NZ-LMI1g  ::Providers have built-in support for capturing request params, aka. googlesheets/:host/:id/FeatureServer/0
  var sheetRange = req.params.id // Park Cleanup!A1:H  OR World Cities!A1:I
  var geojson = {
    type: 'FeatureCollection',
    features: [],
    ttl: 1200, // 20 minutes
    metadata: {
      name: sheetRange.split('!')[0], // Get the workbook name before ! symbol and set as layer name
      description: 'Collaborate in google docs, analyse in ArcGIS'
    }
  }
  var sheets = google.sheets('v4')
  sheets.spreadsheets.values.get({
//    auth: "AIzaSyAVwDBIic7kq3DYrN4cYQxaq2kHmYirWOM",
    spreadsheetId: sheetId, // https://docs.google.com/spreadsheets/d/1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI/edit?usp=sharing
    range: sheetRange
  }, (err, response) => {
    if (err) {
      console.log('Google API returned an error: ' + err)
      return
    }
    var rows = response.values
    if (rows.length > 0) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i]
        if (i === 0) {
          var propertyNames = this.createPropertyNames(row)
          continue
        }
        row.OBJECTID = i // Need to add a unique numeric objectid field
        var feature = this.translate(row, propertyNames)
        geojson.features.push(feature)
      }
      callback(null, geojson)
    }
  })
}

Sheets.prototype.translate = function translate (row, propertyNames) {
  var props = {}
  props.OBJECTID = row.OBJECTID
  var x = propertyNames.indexOf('x')
  var y = propertyNames.indexOf('y')
  for (let i = 0; i < propertyNames.length; i++) {
    if (i === y || i === x) {
      continue
    }
    props[propertyNames[i]] = row[i]
  }
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [parseInt(row[x]), parseInt(row[y])] // Make sure coordinates are numbers not strings
    },
    properties: props
  }
}

Sheets.prototype.createPropertyNames = function createPropertyNames (row) {
  var propertyNames = []
  for (let i = 0; i < row.length; i++) { // Look for columns names commonly reserved for storing geospatial data and transform them to x and y
    var name = row[i].toLowerCase()
    switch (name) {
      case 'latitude':
        name = 'y'
        break
      case 'latitud':
        name = 'y'
        break
      case 'lat':
        name = 'y'
        break
      case 'y':
        name = 'y'
        break
      case 'longitude':
        name = 'x'
        break
      case 'longitud':
        name = 'x'
        break
      case 'long':
        name = 'x'
        break
      case 'lng':
        name = 'x'
        break
    }
    propertyNames.push(name)
  }
  return propertyNames
}
module.exports = Sheets
