var mysqlConn = require('../mysql/mysql_handler')

const Subscription = require('./dataClasses/Subscription')

class sentiSubscriptionService {

    async getIdByUuid(uuid) {
        let select = `SELECT s.id
                FROM deviceSubscription s
                WHERE s.uuid = ?`
        console.log(mysqlConn.format(select, [uuid]))
        let rs = await mysqlConn.query(select, [uuid]).catch(err => {
            console.log(err)
        })
        if (rs[0].length === 1) {
            return rs[0][0].id
        }
        return false
    }
    async getSubscriptions(active = 1) {
        let select = `SELECT s.id, s.uuid, json_unquote(s.data->'$.cron') as cronTime, r.deviceId, r.data as config 
                FROM deviceSubscription s
                    INNER JOIN deviceDataRequest r ON r.id = s.deviceDataRequestId
                WHERE s.active = ?`
        let rs = await mysqlConn.query(select, [active]).catch(err => {
            console.log(err)
        })
        if(rs[0].length > 0) {
            let result = []
            rs[0].forEach(row => {
                result.push(new Subscription(row))
            })
            return result
        }
    }   
    async getSubscription(id = false, active = 1) {
        if (id === false) {
            return false
        }
        let select = `SELECT s.id, s.uuid, json_unquote(s.data->'$.cron') as cronTime, r.data as config 
                FROM deviceSubscription s
                    INNER JOIN deviceDataRequest r ON r.id = s.deviceDataRequestId
                WHERE s.id = ? AND s.active = ?`
        console.log(mysqlConn.format(select, [id, active]))
        let rs = await mysqlConn.query(select, [id, active]).catch(err => {
            console.log(err)
        })
        if(rs[0].length === 1) {
            return new Subscription(rs[0][0])
        }
        return false
    }   
    async getSubscriptionByUuid(uuid = false, active = 1) {
        return await this.getSubscription(await this.getIdByUuid(uuid), active)
    }
}
module.exports = sentiSubscriptionService