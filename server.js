// clean shutdown on `cntrl + c`
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

// Initialize Koop
const Koop = require('koop')
const koop = new Koop()

// Install the trimet Provider
const provider = require('./')
koop.register(provider)

// Start listening for HTTP traffic
const config = require('config')
// Set port for configuration or fall back to default
const port = config.port || 3000
koop.server.listen(port)

const message = `

Koop Trimet Provider listening on ${port}
For more docs visit: https://koopjs.github.io/docs/specs/provider/
To find providers visit: https://www.npmjs.com/search?q=koop+provider

Try it out in your browswer: http://localhost:${port}/googlesheets/FeatureServer/0/query
Or on the command line: curl --silent http://localhost:${port}/googlesheets/FeatureServer/0/query?returnCountOnly=true

Press control + c to exit
`
console.log(message)
