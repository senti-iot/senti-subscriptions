#!/usr/bin/env nodejs
const dotenv = require('dotenv').config()


const sentiSubscription = require('./lib/sentiSubscription')

let mySentiSubscription = new sentiSubscription()
mySentiSubscription.init(
// {
// 	"url": "/web/logs/D0:83:D4:00:3F:52",
// 	"test": true,
// 	"device": {
// 		"id": 3489,
// 		"mqttPub": "v1/universal-tracking-systems-aps-HSTSwMR7zFk/location/europe/registries/uts-xtel19-OGWckPOCpPn/devices/D0:83:D4:00:3F:52/publish"
// 	},
// 	"params": {},
// 	"baseURL": "https://cloud.moviot.dk",
// 	"headers": {
// 		"Authorization": "Token 03faec3547c17bb6ca8a27ba76cd8b007257431d"
// 	},
// 	"authType": 0,
// 	"cloudFunctions": [
// 		110
// 	],
// 	"cloudFunctionMeta": {},
// 	"paramCloudFunction": []
// }
// {
// 	"url": "/api/v1/houses/1352/ecls/1/control/1/setpoint/",
// 	"test": true,
// 	"device": {
// 		"id": 3366,
// 		"mqttPub": "v1/climaid-9143be4c/location/europe/registries/climaid-northq-3934bde1/devices/climaidnorthq-control-ecl-957anZJ8FCo/publish"
// 	},
// 	"params": {},
// 	"authAux": {
// 		"url": "/o/token/",
// 		"params": "grant_type=password&username=q-sensors&password=northq&&client_id=TeFSYMTcWijrT3EaDefCr5JbRUgegqAQXVYioDZQ",
// 		"headers": {
// 			"Content-Type": "application/x-www-form-urlencoded"
// 		},
// 		"accessTokenProp": "access_token"
// 	},
// 	"baseURL": "https://hub.northq.com",
// 	"headers": {},
// 	"authType": 2,
// 	"cloudFunctions": [
// 		107
// 	],
// 	"cloudFunctionMeta": {},
// 	"paramCloudFunction": []
// }
// {
// 	"url": "/api/gethomecoachsdata",
// 	"test": true,
// 	"device": {
// 		"id": 3366,
// 		"mqttPub": "v1/climaid-9143be4c/location/europe/registries/climaid-netatmo-homecoach-OuhIaz4qq0a/publish"
// 	},
// 	"params": {},
// 	"authAux": {
// 		"url": "/oauth2/token",
// 		"params": "grant_type=password&username=s.andersen%40climaid.dk&password=4EqPEf8T&client_id=59a90ed7743c362b818c0985&client_secret=WBiXzww0sZAf4vZzQCgJW95nNXQQF0o264&scope=read_homecoach",
// 		"headers": {
// 			"Content-Type": "application/x-www-form-urlencoded"
// 		},
// 		"accessTokenProp": "access_token"
// 	},
// 	"baseURL": "https://api.netatmo.com",
// 	"headers": {},
// 	"authType": 2,
// 	"cloudFunctions": [
// 		116
// 	],
// 	"cloudFunctionMeta": {},
// 	"paramCloudFunction": []
// }
{
	"url": "/api/v1/houses/1352/dataset/NQLD.0004A30B0023973F.150.100000.1.210/datapoints/",
	"device": {
		"id": 3587,
		"mqttPub": "v1/climaid-9143be4c/location/europe/registries/climaidnorthqtest-smjj8l/devices/0004A30B0023973F/publish"
	},
	"params": {
		"lastEvaluatedKey": "1586304000"
	},
	"authAux": {
		"url": "/o/token/",
		"params": "grant_type=password&username=q-sensors&password=northq&&client_id=TeFSYMTcWijrT3EaDefCr5JbRUgegqAQXVYioDZQ",
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"accessTokenProp": "access_token"
	},
	"baseURL": "https://hub.northq.com",
	"headers": {},
	"authType": 2,
	"cloudFunctions": [
		79
	],
	"cloudFunctionMeta": {
		"endpoint": 210
	},
	"paramCloudFunction": [
		78
	]
}


, console.log)
mySentiSubscription.execute()


// var axios = require('axios');
// var qs = require('qs');
// var data = qs.stringify({
//  'grant_type': 'password',
// 'username': 's.andersen@climaid.dk',
// 'password': '4EqPEf8T',
// 'client_id': '59a90ed7743c362b818c0985',
// 'client_secret': 'WBiXzww0sZAf4vZzQCgJW95nNXQQF0o264',
// 'scope': 'read_homecoach' 
// });
// var config = {
//   method: 'post',
//   url: 'https://api.netatmo.com/oauth2/token',
//   headers: { 
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

// const createAPI = require('apisauce').create

// let pullAPI = createAPI({
// 	baseURL: "https://api.netatmo.com",
// 	headers: { 
// 		'Accept': 'application/json', 
// 		'Content-Type': 'application/x-www-form-urlencoded'
// 	}
// })


// pullAPI.post(this.config.authAux.url, this.config.authAux.params, {headers: this.config.authAux.headers}).then(rs => {
// 	console.log(this.config.authAux.url, this.config.authAux.params, rs.ok, rs.data)
// })

