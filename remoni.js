#!/usr/bin/env nodejs
const dotenv = require('dotenv').config()


const sentiSubscription = require('./lib/sentiSubscription')

let mySentiSubscription = new sentiSubscription()
mySentiSubscription.init(
	{
		"url": "/v1/Data",
		"test": true,
		"device": {
			// "id": 3596,
			"mqttPub": "v1/vejen-kommune-qQDJrKiIARb/location/europe/registries/demvejenpowermonispot-fy7yp4/publish"
		},
		"params": {
			"orderby": "Timestamp",
			"Timestamp": "ge(2020-10-01T00:00:00Z)",
			// "Timestamp": "ge(2020-10-20T00:00:00Z)",
			// "Timestamp": "ge(2020-11-12T00:00:00Z)",
			// "Timestamp": "ge(2020-12-28T00:00:00Z)",
			// "Timestamp": "ge(2021-01-03T00:00:00Z)",
			// "Timestamp": "ge(2021-02-21T00:00:00Z)",
			// "Timestamp": "ge(2021-03-01T00:00:00Z)",
			// "Timestamp": "ge(2021-03-10T00:00:00Z)",
			"UnitId": "eq(5227)",
			"AggregateType": "eq(Minutes5)",
			"DataType": "eq(uncalibrated-current)",
			// "DataType": "eq(apparent-power)",
			"UnitTypeInputId": "eq(2801)",
			// "top": 10000
 			"top": 1
		},
		"baseURL": "https://api.remoni.com",
		"headers": {
			"Authorization": "Basic c2VudGlAc2VudGkuaW86N1RYYzZjTDRoYWU3UG1k"
		},
		"authType": 3,
		"cloudFunctions": [
			117
		],
		"cloudFunctionMeta": {},
		"paramCloudFunction": [
			// 119
		]
	}
	
// {
// 	"url": "/v1/Data",
// 	"test": true,
// 	"device": {
// 		// "id": 3596,
// 		"mqttPub": "v1/vejen-kommune-qQDJrKiIARb/location/europe/registries/demvejenheatmonispot-3lzff7/publish" // "v1/vejen-kommune-qQDJrKiIARb/location/europe/registries/demvejenpowermonispot-fy7yp4/publish"
// 	},
// 	"params": {
// 		"orderby": "Timestamp",
// 		// "Timestamp": "ge(2020-10-01T00:00:00Z)",
// 		"Timestamp": "ge(2020-10-20T00:00:00Z)",
// 		// "Timestamp": "ge(2020-11-24T00:00:00Z)",
// 		// "Timestamp": "ge(2020-12-01T00:00:00Z)",
// 		// "Timestamp": "ge(2021-01-04T00:00:00Z)",
// 		// "Timestamp": "ge(2021-02-09T00:00:00Z)",
// 		// "Timestamp": "ge(2021-03-13T00:00:00Z)",
// 		// "Timestamp": "ge(2021-04-16T00:00:00Z)",
// 		"UnitId": "eq(3797)",
// 		"AggregateType": "eq(Minutes5)",
// 		"DataType": "eq(temperature)",
// 		// "UnitTypeInputId": "eq(3101)",
// 		// "UnitTypeInputId": "eq(3102)",
// 		"UnitTypeInputId": "eq(3103)",

// 		// "UnitTypeInputId": "eq(4301)",
// 		// "UnitTypeInputId": "eq(4302)",
// 		// "UnitTypeInputId": "eq(4303)",
// 		// "UnitTypeInputId": "eq(4304)",

// 		"top": 10000
// 		// "top": 10
// 		// "top": 1
// 	},
// 	"baseURL": "https://api.remoni.com",
// 	"headers": {
// 		"Authorization": "Basic c2VudGlAc2VudGkuaW86N1RYYzZjTDRoYWU3UG1k"
// 	},
// 	"authType": 3,
// 	"cloudFunctions": [
// 		118
// 	],
// 	"cloudFunctionMeta": {},
// 	"paramCloudFunction": [
// 		// 119
// 	]
// }

// PPM
	// {
	// 	"url": "/v1/Data",
	// 	"test": true,
	// 	"device": {
	// 		// "id": 3596,
	// 		"mqttPub": "v1/vejen-kommune-qQDJrKiIARb/location/europe/registries/demvejenpowermonimain-rwq8rg/publish"
	// 	},
	// 	"params": {
	// 		"orderby": "Timestamp",
	// 		// "Timestamp": "ge(2020-10-01T00:00:00Z)",
	// 		// "Timestamp": "ge(2020-11-23T00:00:00Z)",
	// 		// "Timestamp": "ge(2020-12-29T00:00:00Z)",
	// 		// "Timestamp": "ge(2021-01-03T00:00:00Z)",
	// 		// "Timestamp": "ge(2021-02-01T00:00:00Z)",
	// 		"Timestamp": "ge(2021-03-07T00:00:00Z)",
	// 		"UnitId": "eq(5612)",
	// 		"AggregateType": "eq(Minutes5)",
	// 		// "DataType": "eq(power)",
	// 		"DataType": "eq(current)",
	// 		// "DataType": "eq(apparent-power)",
	// 		"UnitTypeInputId": "eq(null)",
	// 		// "UnitTypeInputId": "eq(3003)",
	// 		"top": 10000
	// 		// "top": 1200
 	// 		// "top": 1
	// 	},
	// 	"baseURL": "https://api.remoni.com",
	// 	"headers": {
	// 		"Authorization": "Basic c2VudGlAc2VudGkuaW86N1RYYzZjTDRoYWU3UG1k"
	// 	},
	// 	"authType": 3,
	// 	"cloudFunctions": [
	// 		138
	// 	],
	// 	"cloudFunctionMeta": {},
	// 	"paramCloudFunction": [
	// 		// 119
	// 	]
	// }


// {
// 	"url": "/api/buildings/2.0/building/indoor/908765",
// 	"device": {
// 		"id": 3598,
// 		"mqttPub": "v1/vejen-kommune-qQDJrKiIARb/location/europe/registries/demVejenIcMeter-5wgc7d/publish"
// 	},
// 	"params": {
// 		// "period": "1-hour",
// 		// "start_time": "2020-10-01T00:00:00Z",
// 		// "end_time": "2020-10-10T00:00:00Z"

// 		// "start_time": "2020-10-10T00:00:00Z",
// 		// "end_time": "2020-10-20T00:00:00Z"

// 		// "start_time": "2020-10-20T00:00:00Z",
// 		// "end_time": "2020-11-01T00:00:00Z"

// 		// "start_time": "2020-11-01T00:00:00Z",
// 		// "end_time": "2020-11-10T00:00:00Z"

// 		// "start_time": "2020-11-10T00:00:00Z",
// 		// "end_time": "2020-11-15T00:00:00Z"

// 		// "start_time": "2020-11-15T00:00:00Z",
// 		// "end_time": "2020-11-20T00:00:00Z"

// 		// "start_time": "2020-11-20T00:00:00Z",
// 		// "end_time": "2020-11-25T00:00:00Z"

// 		// "start_time": "2020-11-25T00:00:00Z",
// 		// "end_time": "2020-12-01T00:00:00Z"

// 		// "start_time": "2020-12-01T00:00:00Z",
// 		// "end_time": "2020-12-05T00:00:00Z"

// 		// "start_time": "2020-12-05T00:00:00Z",
// 		// "end_time": "2020-12-10T00:00:00Z"

// 		// "start_time": "2020-12-10T00:00:00Z",
// 		// "end_time": "2020-12-15T00:00:00Z"

// 		// "start_time": "2020-12-15T00:00:00Z",
// 		// "end_time": "2020-12-20T00:00:00Z"

// 		// "start_time": "2020-12-20T00:00:00Z",
// 		// "end_time": "2021-12-25T00:00:00Z"

// 		// "start_time": "2020-12-25T00:00:00Z",
// 		// "end_time": "2021-01-01T00:00:00Z"

// 		// "start_time": "2021-01-01T00:00:00Z",
// 		// "end_time": "2021-01-05T00:00:00Z"

// 		// "start_time": "2021-01-05T00:00:00Z",
// 		// "end_time": "2021-01-10T00:00:00Z"

// 		// "start_time": "2021-01-10T00:00:00Z",
// 		// "end_time": "2021-01-15T00:00:00Z"

// 		// "start_time": "2021-01-15T00:00:00Z",
// 		// "end_time": "2021-01-20T00:00:00Z"

// 		// "start_time": "2021-01-20T00:00:00Z",
// 		// "end_time": "2021-01-25T00:00:00Z"

// 		// "start_time": "2021-01-25T00:00:00Z",
// 		// "end_time": "2021-02-01T00:00:00Z"

// 		// "start_time": "2021-02-01T00:00:00Z",
// 		// "end_time": "2021-02-05T00:00:00Z"
// 	},
// 	"authAux": {
// 		"url": "oauth/token",
// 		"params": "grant_type=password&username=senti@senti.io&password=slucluwravichaenai&client_id=trusted-client&scope=trust",
// 		"headers": {
// 			"Content-Type": "application/x-www-form-urlencoded"
// 		},
// 		"accessTokenProp": "access_token"
// 	},
// 	"baseURL": "https://app.ic-meter.com/icm",
// 	"headers": {},
// 	"authType": 2,
// 	"cloudFunctions": [
// 		120
// 	],
// 	"cloudFunctionMeta": {},
// 	"paramCloudFunction": []
// }

// {
// 	"url": "/api/index.php",
// 	"device": {
// 		// "id": 3598,
// 		"mqttPub": "v1/vejen-kommune-qQDJrKiIARb/location/europe/registries/demvejenroomalyzer-yllc7l/publish"
// 	},
// 	"params": {
// 		"lane":"sensor_data",
// 		"sensor":"12341",
// 		// "time":1615282500,
// 		// "time":1612604400,
// 		// "time":1609929600,
// 		"time":1607251200,
// 		// "time":1609929600,
// 		"checksum":"0b642c0ab93708bf83767cf2420b70eb60bc26caecdc8f53e91801039fdff462",
// 		"hours":744
// 	},
// 	"authAux": {},
// 	"baseURL": "https://app.roomalyzer.com",
// 	"headers": {},
// 	"authType": 1,
// 	"cloudFunctions": [
// 		139
// 	],
// 	"cloudFunctionMeta": {
// 		"sensor":"12341"
// 	},
// 	"paramCloudFunction": [
// 		144
// 	]
// }

, console.log)
mySentiSubscription.execute()

