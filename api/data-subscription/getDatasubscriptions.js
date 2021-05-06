const express = require('express')
const router = express.Router()

const sentiSubscriptionService = require('../../lib/sentiSubscriptionsService')
const subscriptionService = new sentiSubscriptionService()

const cron = require('../../server').sentiCron

router.get('/subs', async (req, res, next) => {
    res.status(200).json(await subscriptionService.getSubscriptions())
})
router.get('/sub/:uuid', async (req, res, next) => {
    res.status(200).json(await subscriptionService.getSubscriptionByUuid(req.params.uuid))
})
router.post('/sub/:uuid', async (req, res, next) => {
    res.status(200).json()
})
router.put('/sub/:uuid', async (req, res, next) => {
    // let subscription = await subscriptionService.getSubscriptionByUuid(req.params.uuid)
    // cron.stop(subscription.id)
    res.status(200).json()
})
router.get('/sub/:uuid/start', async (req, res, next) => {
    res.status(200).json(cron.start(await subscriptionService.getIdByUuid(req.params.uuid)))
})
router.get('/sub/:uuid/stop', async (req, res, next) => {
    res.status(200).json(cron.stop(await subscriptionService.getIdByUuid(req.params.uuid)))
})
router.get('/sub/:uuid/status', async (req, res, next) => {
    console.log(subscriptionService.getIdByUuid(req.params.uuid))
    res.status(200).json(cron.status(await subscriptionService.getIdByUuid(req.params.uuid)))
})
router.get('/sub/:uuid/run', async (req, res, next) => {
    res.status(200).json(cron.run(await subscriptionService.getSubscriptionByUuid(req.params.uuid)))
})

module.exports = router