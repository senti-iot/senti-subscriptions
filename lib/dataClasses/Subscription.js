const sentiData = require('senti-apicore').sentiData

class Subscription extends sentiData {
	id = null
	uuid = null
	cronTime = null
	config = null

	constructor(data = null, vars = null) {
		super()
		this.assignData(data, vars)
	}
}
module.exports = Subscription