const createAPI = require('apisauce').create
const sentiMqttClient = require('../server').sentiMqttClient

class sentiSubscription {
    constructor() {
        this.authExecute = null
    }
    init(config, cb) {
        this.mqttPrefix = (process.env.NODE_ENV === 'production') ? '' : 'v2/dev/'
        this.debug = (process.env.SENTI_DEBUG === 'on') ? this._debug : this._nodebud
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
                this.authExecute = this.executeAuthHeaders
                break;
            case 2:
                this.authExecute = this.executeAuthBearerToken
                break;
            default:
                break;
        }
    }
    _nodebud() {}
    _debug() {
        console.log('debug', ...arguments)
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
            this.debug('Device. ' + this.config.device.id, rs.ok)
            if (rs.ok) {
                this.executeCloudFunction(rs.data)
            } else {
                console.log('PullData fail:', rs.status, this.config);
            }
        })
    }
    async executeParamCloudFunction() {
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
            this.sendData(pullData)
        }
    }
    sendData(pullData) {
        // console.log('sendData')
        if(Array.isArray(pullData) && pullData.length >= 1) {
            pullData.forEach(data => {
                sentiMqttClient.sendMessage(this.mqttPrefix + this.config.device.mqttPub, JSON.stringify(data))
            })
        }
        //this.cb('callback', pullData)
    }
    executeAuthBearerToken() {
        this.pullAPI.post(this.config.authAux.url, this.config.authAux.params, {headers: this.config.authAux.headers}).then(rs => {
            // console.log(this.config.authAux.url, this.config.authAux.params, rs.ok, rs.data)
            let token = (typeof rs.data.token_type != 'undefined') ? rs.data.token_type : 'Bearer'
            this.pullAPI.setHeader('Authorization', token+' '+rs.data.access_token)
            this.pullData()
        })
    }
    executeAuthHeaders() {
        this.pullAPI.get(this.config.url, this.config.params, {headers: this.config.headers}).then(rs => {
            this.debug('Device. ' + this.config.device.id, rs.ok)
            this.executeCloudFunction(rs.data)
        })
    }
}
module.exports = sentiSubscription