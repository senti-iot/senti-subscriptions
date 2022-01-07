const sentiSubscription = require('./sentiSubscription')
const sentiSubscriptionService = require('./sentiSubscriptionsService')
const subscriptionService = new sentiSubscriptionService()

const CronJob = require('cron').CronJob

class sentiSubscriptionCron {
    constructor() {
        this.subscriptions = []
    }
    async init() {
        let subscriptions = await subscriptionService.getSubscriptions()
        subscriptions.forEach(subscription => {
            this.add(subscription.id, subscription.cronTime ,subscription.config)
            console.log(subscription.id, subscription.uuid, subscription.cronTime)
            this.start(subscription.id)
        })

        return subscriptions
        // let query = `SELECT s.id, s.uuid, s.data, r.deviceId, r.data as config 
        //         FROM deviceSubscription s
        //             INNER JOIN deviceDataRequest r ON r.id = s.deviceDataRequestId
        //         WHERE s.active = 1`
        // mysqlConn.query(query, []).then(rs => {
        //     if(rs[0].length > 0) {
        //         rs[0].forEach(r => {
        //             this.add(r.id, r.data.cron, r.config)
        //             console.log(r.id, r.uuid, r.data.cron)
        //             this.subscriptions['id'+r.id].start()
        //         })
        //     }
        // }).catch(err => {
        //     console.log(err)
        // })
    }
    async reload() {
        Object.keys(this.subscriptions).forEach(key => {
            this.subscriptions[key].stop()
        })
        this.subscriptions = []
        return await this.init()
    }
    add(id, cronTime, config) {
        this.subscriptions['id'+id] = new CronJob(cronTime, function() {
            let mySentiSubscription = new sentiSubscription()
            mySentiSubscription.init(config, console.log)
            mySentiSubscription.execute()
        })
    }
    start(id) {
        if(typeof this.subscriptions['id'+id] !== 'undefined') {
            this.subscriptions['id'+id].start()
            return this.subscriptions['id'+id].running
        }
        return false
    }
    stop(id) {
        if(typeof this.subscriptions['id'+id] !== 'undefined') {
            this.subscriptions['id'+id].stop()
            return !this.subscriptions['id'+id].running
        }
        return false
    }
    status(id) {
        if(typeof this.subscriptions['id'+id] !== 'undefined') {
            let result = {
                "running": this.subscriptions['id'+id].running ? this.subscriptions['id'+id].running : false,
                "next": this.subscriptions['id'+id].nextDates(),
                "last": this.subscriptions['id'+id].lastDate(),
            }
            return result
        }
        return false
    }
    run(subscription) {
        let mySentiSubscription = new sentiSubscription()
        mySentiSubscription.init(subscription.config, console.log)
        mySentiSubscription.execute()
        return subscription
    }
}

module.exports = sentiSubscriptionCron