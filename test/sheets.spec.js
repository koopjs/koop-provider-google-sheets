const test = require('tape')
const proxyquire = require('proxyquire')
const resFixture = require('./fixtures/response.json')
const geojsonFixture = require('./fixtures/geojson.json')
const modulePath = '../sheets'

const Model = proxyquire(modulePath, {
  'googleapis': {
    google: {
      sheets: () => {
        return {
          spreadsheets: {
            values: {
              get: (params, options, callback) => {
                callback(null, resFixture)
              }
            }
          }
        }
      }
    }
  }
})

test('model translation to geojson', spec => {
  spec.plan(2)
  const model = new Model()
  const reqMock = {
    params: {
      id: 'fires!A1:I'
    }
  }
  model.getData(reqMock, (err, geojson) => {
    spec.notOk(err)
    spec.deepEquals(geojson, geojsonFixture, 'generates expected geojson')
  })
})
