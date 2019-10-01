var mysqlConn = require('../mysql/mysql_handler')
const sentiSubscription = require('../lib/sentiSubscription')
const CronJob = require('cron').CronJob

class sentiSubscriptionCron {
    constructor() {
        this.subscriptions = []
    }
    init() {
        let query = `SELECT s.id, s.data, r.device_id, r.data as config 
                FROM Device_subscription s
                    INNER JOIN Device_data_request r ON r.id = s.device_data_request_id
                WHERE s.active = 1`
        mysqlConn.query(query, []).then(rs => {
            if(rs[0].length > 0) {
                rs[0].forEach(r => {
                    this.add(r.id, r.data.cron, r.config)
                    //this.subscriptions[r.id].start()

/*                     let mySentiSubscription = new sentiSubscription()
                    mySentiSubscription.init(r.config, console.log)
                    mySentiSubscription.execute()
 */
                })
                //console.log(this.subscriptions)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    add(id, cronTime, config) {
        this.subscriptions['id'+id] = new CronJob(cronTime, function() {
            const d = new Date();
            console.log(d, config);
/*
            let mySentiSubscription = new sentiSubscription()
            mySentiSubscription.init(config, console.log)
            mySentiSubscription.execute()
*/
        })
    }
    delete(id) {

    }
    update(id) {

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
}

module.exports = sentiSubscriptionCron