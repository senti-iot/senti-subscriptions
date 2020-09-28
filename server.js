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

//const createAPI = require('apisauce').create
var mysqlConn = require('./mysql/mysql_handler')
const sentiSubscription = require('./lib/sentiSubscription')
const CronJob = require('cron').CronJob

var subScriptions = {}

let query = `SELECT s.id, s.data, r.deviceId, r.data as config 
                FROM deviceSubscription s
                    INNER JOIN deviceDataRequest r ON r.id = deviceDataRequestId
                WHERE s.active = 1`
mysqlConn.query(query, []).then(rs => {
    if(rs[0].length > 0) {
        rs[0].forEach(r => {
            subScriptions[r.id] = new CronJob(r.data.cron, function() {
                const d = new Date();
                console.log(d);
            	let mySentiSubscription = new sentiSubscription()
                mySentiSubscription.init(r.config, console.log)
                mySentiSubscription.execute()
            });
            subScriptions[r.id].start()

            let mySentiSubscription = new sentiSubscription()
            mySentiSubscription.init(r.config, console.log)
            mySentiSubscription.execute()
        })
        console.log(subScriptions)
    }
}).catch(err => {
    console.log(err)
})
//#endregion