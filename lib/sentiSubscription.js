const createAPI = require('apisauce').create
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
            case 2:
                console.log('Auth Bearer')
                this.authExecute = this.executeAuthBearerToken
                break;
            default:
                console.log('Arghh, just pull')
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
        this.pullAPI.get(this.config.url, this.config.params).then(rs => {
            this.executeCloudFunction(rs.data)
        })
    }
    async executeParamCloudFunction() {
        console.log(this.config.params)
        if(this.config.paramCloudFunction && this.config.paramCloudFunction.length >= 1) {
            let self = this
            const cloudAPI = require('./cloudEngine')
            await cloudAPI.post('/',
                { nIds: this.config.paramCloudFunction, data: this.config.params })
                .then(rs => {
                    console.log('Param EngineAPI Response:', rs.status);
                    self.config.params = rs.data
                })
        }
    }
    executeCloudFunction(pullData) {
        //console.log(pullData)
        if(this.config.cloudFunctions && this.config.cloudFunctions.length >= 1) {
            const cloudAPI = require('./cloudEngine')
            cloudAPI.post('/',
                { nIds: this.config.cloudFunctions, data: pullData })
                .then(rs => {
                    console.log('EngineAPI Response:', rs.status);
                    return rs.ok ? this.sendData(rs.data) : this.sendData(pullData)
                })
        } else {
            console.log('No cloudFunction')
            this.sendData(pullData)
        }
    }

    sendData(pullData) {

        let newConn = mqtt.connect('mqtt://hive.senti.cloud')
        newConn.on('connect', () => {
            console.log('Connected')
            if(Array.isArray(pullData) && pullData.length >= 1) {
                pullData.forEach(data => {
                    newConn.publish(this.config.device.mqttPub, JSON.stringify(data))    
                })
            }
            console.log('Ended')
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
            let token = (typeof rs.data.token_type != 'undefined') ? rs.data.token_type : 'Bearer'
            this.pullAPI.setHeader('Authorization', token+' '+rs.data.access_token)
            //this.pullAPI.setHeader('Authorization', rs.data.token_type+' '+rs.data.access_token)
            //this.pullAPI.setHeader('Authorization', 'Bearer '+rs.data[this.config.authAux.accessTokenProp])
            this.pullData()
        })
    }
}

module.exports = sentiSubscription