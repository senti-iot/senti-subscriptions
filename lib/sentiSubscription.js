const createAPI = require('apisauce').create

class sentiSubscription {
    db = null
    baseUrl = null
    authExecute = null

    constructor(db) {
        if(typeof db === 'undefined') {
            try {
                this.db = require('../mysql/mysql_handler')
            } catch (e) {
                console.log("ERROR:", e.message)
                return false
            }
        } else {
            this.db = db
        }
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
        if(this.authExecute === null) {
            this.pullData()
        } else {
            this.authExecute()
        }
    }
    pullData() {
        this.pullAPI.get(this.config.url, this.config.params).then(rs => {
            this.executeCloudFunction(rs.data)
        })
    }
    executeCloudFunction(pullData) {
        console.log(pullData)
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
         var dataBrokerChannel = new mqttHandler('senti-data')
        dataBrokerChannel.connect()

        if(Array.isArray(pullData) && pullData.length >= 1) {
            pullData.map(data => {
                dataBrokerChannel.sendMessage(this.config.device.mqttPub, JSON.stringify(data))
                console.log(data)
            })
        }
        this.cb('callback', pullData)
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