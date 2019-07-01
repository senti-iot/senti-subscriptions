#!/bin/bash

if [[ "$1" == "master" ]]; then 
	echo
	echo Deploying Senti subscriptions $1 ... 
	rsync -r --quiet $2/ deploy@rey.webhouse.net:/srv/nodejs/senti/services/subscriptions/production
	echo
	echo Restarting Senti subscriptions service: $1 ... 
	ssh deploy@rey.webhouse.net 'sudo /srv/nodejs/senti/services/subscriptions/production/scripts/service-restart.sh master'
	echo
	echo Deployment to Senti subscriptions $1 and restart done!
	exit 0
fi 

if [[ "$1" == "dev" ]]; then 
	echo
	echo Deploying Senti subscriptions $1 ... 
	rsync -r --quiet $2/ deploy@rey.webhouse.net:/srv/nodejs/senti/services/subscriptions/development
	echo
	echo Restarting Senti subscriptions service: $1 ... 
	ssh deploy@rey.webhouse.net 'sudo /srv/nodejs/senti/services/subscriptions/development/scripts/service-restart.sh dev'
	echo
	echo Deployment to Senti subscriptions $1 and restart done!
	exit 0
fi