const createAPI = require('apisauce').create
const dotenv = require('dotenv').config()
const crypto = require('crypto')

const IV_LENGTH = 16 

const encrypt = (text) => {
	let iv = crypto.randomBytes(IV_LENGTH)
	let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(process.env.ENCRYPTION_KEY), iv)
	let encrypted = cipher.update(text)

	encrypted = Buffer.concat([encrypted, cipher.final()])

	return iv.toString('hex') + ':' + encrypted.toString('hex')
}



let cloudFunctionAPI = createAPI({
    //baseURL: 'http://127.0.0.1:3011/v1',
    baseURL: 'https://services.senti.cloud/functions/v1',
	headers: { 
		'Accept': 'application/json', 
		'Content-Type': 'application/json',
		'auth': encrypt(process.env.ENCRYPTION_KEY) 
	}
})

module.exports = cloudFunctionAPI