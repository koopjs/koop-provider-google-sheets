const google = require('googleapis')
const config = require('config')
const sheets = google.sheets('v4')
const XVARS = ['x', 'longitude', 'lon', 'long', 'longitud', 'longitude coordinate']
const YVARS = ['y', 'latitude', 'lat', 'latitud', 'latitude coordinate']
// var googleAuth = require('google-auth-library')

function GoogleSheets () {}

GoogleSheets.prototype.getData = function getData (req, callback) {
  const spreadsheetId = req.params.host  // e.g. 1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI OR 1dK_touGylnTtJBzve2HEwfev_f6JxCpRMb2NZ-LMI1g  ::Providers have built-in support for capturing request params, aka. googlesheets/:host/:id/FeatureServer/0
  const range = req.params.id // e.g. Park Cleanup!A1:H  OR World Cities!A1:I
  const gsOpts = {
    auth: config.googlesheets.auth,
    spreadsheetId, // e.g. https://docs.google.com/spreadsheets/d/1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI/edit?usp=sharing
    range
  }
  sheets.spreadsheets.values.get(gsOpts, {valueRenderOption: 'ValueRenderOption.UNFORMATTED_VALUE'}, (err, res) => {
    if (err) return callback(err)
    const geojson = translate(res)
    geojson.ttl = config.googlesheets.ttl || 1200 // 20 minutes
    geojson.metadata = {
      name: range.split('!')[0], // Get the workbook name before ! symbol and set as layer name
      description: 'Collaborate in Google docs, analyse in ArcGIS'
    }
    callback(null, geojson)
  })
}

function translate (response) {
  const propertyNames = createPropertyNames(response.values[0])
  return {
    type: 'FeatureCollection',
    features: response.values.slice(1).map(row => { return formatFeature(row, propertyNames) })
  }
}

function formatFeature (row, propertyNames) {
  const x = propertyNames.indexOf('x')
  const y = propertyNames.indexOf('y')
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(row[x]), parseFloat(row[y])] // Make sure coordinates are numbers not strings
    },
    properties: row.reduce((props, prop, i) => {
      if (i === x || i === y) return props
      if (/^[0-9.,]+$/.test(prop)) prop = parseFloat(prop.replace(/,/, ''))
      props[propertyNames[i]] = prop
      return props
    }, {})
  }
}

function createPropertyNames (header) {
  let xFound = false
  let yFound = false
  return header.map(head => {
    const candidate = head.toLowerCase()
    if (YVARS.indexOf(candidate) > -1 && !yFound) {
      yFound = true
      return 'y'
    } else if (XVARS.indexOf(candidate) > -1 && !xFound) {
      xFound = true
      return 'x'
    } else return head
  })
}

module.exports = GoogleSheets
