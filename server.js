#!/usr/bin/env nodejs
const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()

// API endpoint imports

const port = process.env.NODE_PORT || 3013

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())




//---Start the express server---------------------------------------------------

const startServer = () => {
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

//#region Subscriptions/CRON

const createAPI = require('apisauce').create
const sentiSubscription = require('./lib/sentiSubscription')
const CronJob = require('cron').CronJob

// DEMO DATA 
datafranetatmo = {
    baseURL: 'https://api.netatmo.com',
    authType: 2,
    authAux: {
        url: '/oauth2/token',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        params: 'grant_type=password&username=cb%40senti.io&password=Fejl40fugl&scope=read_station&client_id=5cefcea6e9532369ed521b89&client_secret=YuOFRtpwJJFgV5elWP03G2EGWmo',
        accessTokenProp: 'access_token'
    },
    url: '/api/getstationsdata',
    params: {
        device_id: "70:ee:50:14:5d:d2"
    },
    headers: {},
    cloudFunctions: [24],
     device: {
        id: '657',
        company: 'webhouse',
        location: 'europa',
        registry: 'demo-registry',
        mqttPub: 'v1/webhouse/location/europe/registries/demo-registry/devices/netatmo---stine-4adee4f1/publish'
    }
}

const job = new CronJob('*/10 * * * *', function() {
    const d = new Date();
	console.log(d);
	let mySentiSubscription = new sentiSubscription()
    mySentiSubscription.init(datafranetatmo, console.log)
    mySentiSubscription.execute()
});
job.start();


//#endregion