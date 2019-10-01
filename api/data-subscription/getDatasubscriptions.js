const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('senti-apicore').verifyapiversion
const { authenticate } = require('senti-apicore')
var mysqlConn = require('../../mysql/mysql_handler')

const cron = require('../../server').sentiCron

router.get('/mb/:id/', async (req, res, next) => {
    console.log('Mikkel', cron.subscriptions)

/*     let query = `SELECT s.id, s.data, r.device_id, r.data as config 
        FROM Device_subscription s
            INNER JOIN Device_data_request r ON r.id = s.device_data_request_id
        WHERE s.active = 1`
    mysqlConn.query(query, []).then(rs => {
        if(rs[0].length > 0) {
            res.status(200).json(rs[0])
        }
    }).catch(err => {
        console.log(err)
    })
 */
     let result = {
        "query": req.query,
        "params": req.params,
        "cron": cron.subscriptions['id'+req.params.id].cronTime
    }
    res.status(200).json([result])
})

router.get('/subs', async (req, res, next) => {
    console.log('subs', cron.subscriptions)

    res.status(200).json('Hej')
})


router.get('/sub/:id/start', async (req, res, next) => {
    res.status(200).json(cron.start(req.params.id))
})
router.get('/sub/:id/stop', async (req, res, next) => {
    res.status(200).json(cron.stop(req.params.id))
})
router.get('/sub/:id/status', async (req, res, next) => {
    res.status(200).json(cron.status(req.params.id))
})

module.exports = router