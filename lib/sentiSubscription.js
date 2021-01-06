const createAPI = require('apisauce').create
// const qs = require('qs');
const mqtt = require('mqtt');
//var mqttHandler = require('./mqtt_handler')

class sentiSubscription {
    constructor() {
        this.authExecute = null
    }
    init(config, cb) {
        this.cb = cb
        this.config = config
        this.pullAPI = createAPI({
            baseURL: config.baseURL,
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            }
        })
        switch(config.authType) {
            case 3:
                // console.log('Auth Headers')
                this.authExecute = this.executeAuthHeaders
                break;
            case 2:
                // console.log('Auth Bearer')
                this.authExecute = this.executeAuthBearerToken
                break;
            default:
                // console.log('Arghh, just pull')
                break;
        }
    }
    execute() {
        this.executeParamCloudFunction().then(() => {
            if(this.authExecute === null) {
                this.pullData()
            } else {
                this.authExecute()
            }
        })
    }
    pullData() {
        // console.log(this.config.params)
        this.pullAPI.get(this.config.url, this.config.params).then(rs => {
            console.log('Device. ' + this.config.device.id, rs.ok)
            if (rs.ok) {
                this.executeCloudFunction(rs.data)
            } else {
                console.log('PullData fail:', rs.status, this.config);
            }
            
        })
    }
    async executeParamCloudFunction() {
        // console.log(this.config.params)
        if(this.config.paramCloudFunction && this.config.paramCloudFunction.length >= 1) {
            let self = this
            const cloudAPI = require('./cloudEngine')
            await cloudAPI.post('/',
                { nIds: this.config.paramCloudFunction, data: this.config.params })
                .then(rs => {
                    if (!rs.ok) {
                        console.log('Param EngineAPI Response:', rs.status, this.config);
                    }
                    self.config.params = rs.data
                })
        }
    }
    executeCloudFunction(pullData) {
        //console.log(pullData)
        if(this.config.cloudFunctions && this.config.cloudFunctions.length >= 1) {
            pullData.cloudFunctionMeta = this.config.cloudFunctionMeta
            const cloudAPI = require('./cloudEngine')
            cloudAPI.post('/',
                { nIds: this.config.cloudFunctions, data: pullData })
                .then(rs => {
                    if (!rs.ok) {
                        console.log('EngineAPI Response:', rs.status, this.config, pullData);
                    }
                    return rs.ok ? this.sendData(rs.data) : this.sendData(pullData)
                })
        } else {
            console.log('No cloudFunction')
            this.sendData(pullData)
        }
    }
    sendData(pullData) {
        // console.log('sendData')
        let newConn = mqtt.connect(process.env.MQTT_HOST, { username: process.env.MQTT_USER, password: process.env.MQTT_PASS })
        newConn.on('connect', () => {
            // console.log('Connected')
            if(Array.isArray(pullData) && pullData.length >= 1) {
                pullData.forEach(data => {
                    // console.log(data)
                    newConn.publish(this.config.device.mqttPub, JSON.stringify(data))    
                })
            }
            // console.log('Ended')
            newConn.end()
        })


/*         var dataBrokerChannel = new mqttHandler('senti-data')
        dataBrokerChannel.connect()
        console.log('conn')
        let messages = pullData.length
        console.log('messages: '+messages)
        if(Array.isArray(pullData) && pullData.length >= 1) {
            pullData.map(data => {
                dataBrokerChannel.sendMessage(this.config.device.mqttPub, JSON.stringify(data))
                messages--
                console.log('messages: '+messages)
                //console.log('a')
            })
        }
        console.log('will disconn')
        console.log('messages: '+messages)
        if(messages == 0) {
            dataBrokerChannel.disconnect()
            console.log('disconn')
        }
 */        
        //this.cb('callback', pullData)
    }

    executeAuthBearerToken() {
        this.pullAPI.post(this.config.authAux.url, this.config.authAux.params, {headers: this.config.authAux.headers}).then(rs => {
            // console.log(this.config.authAux.url, this.config.authAux.params, rs.ok, rs.data)
            let token = (typeof rs.data.token_type != 'undefined') ? rs.data.token_type : 'Bearer'
            this.pullAPI.setHeader('Authorization', token+' '+rs.data.access_token)
            //this.pullAPI.setHeader('Authorization', rs.data.token_type+' '+rs.data.access_token)
            //this.pullAPI.setHeader('Authorization', 'Bearer '+rs.data[this.config.authAux.accessTokenProp])
            this.pullData()
        })
    }

    executeAuthHeaders() {
        this.pullAPI.get(this.config.url, this.config.params, {headers: this.config.headers}).then(rs => {
            console.log('Device. ' + this.config.device.id, rs.ok)
            // console.log(rs.data)
            this.executeCloudFunction(rs.data)
        })
    }
}

module.exports = sentiSubscription