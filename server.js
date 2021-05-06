#!/usr/bin/env nodejs
process.title = "iotrace-gateway"
const dotenv = require('dotenv').config()
if (dotenv.error) {
	console.warn(dotenv.error)
}
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()

// ACL Client
const sentiAuthClient = require('senti-apicore').sentiAuthClient
const authClient = new sentiAuthClient(process.env.AUTHCLIENTURL, process.env.PASSWORDSALT)
module.exports.authClient = authClient

const sentiAclBackend = require('senti-apicore').sentiAclBackend
const sentiAclClient = require('senti-apicore').sentiAclClient

const aclBackend = new sentiAclBackend(process.env.ACLBACKENDTURL)
const aclClient = new sentiAclClient(aclBackend)
module.exports.aclClient = aclClient

//#region mqtt handler
const sentiMqttHandler = require('senti-apicore').secureMqttHandler
const sentiMqttClient = new sentiMqttHandler(process.env.MQTT_HOST, process.env.MQTT_USER, process.env.MQTT_PASS, 'sentiHandler')
sentiMqttClient.connect()
module.exports.sentiMqttClient = sentiMqttClient
//#endregion

//#region sentiSubscriptionCron/CRON init
const sentiSubscriptionCron = require('./lib/sentiSubscriptionCron')
const sentiCron = new sentiSubscriptionCron()
module.exports.sentiCron = sentiCron
sentiCron.init()
//#endregion

// API Request Parsers
const port = process.env.NODE_PORT || 3013

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// API endpoint imports
const auth = require('./api/auth/auth')
app.use([auth])

const getDatasubscriptions = require('./api/data-subscription/getDatasubscriptions')
app.use([getDatasubscriptions])


//---Start the express server---------------------------------------------------

var printRoutes = require('./lib/printRoutes')

const startServer = () => {
	console.clear()
	printRoutes(app)
	app.listen(port, () => {
		console.log('Senti Service started on port', port)
	}).on('error', (err) => {
		if (err.errno === 'EADDRINUSE') {
			console.log('Service not started, port ' + port + ' is busy')
		} else {
			console.log(err)
		}
	})
}

startServer()