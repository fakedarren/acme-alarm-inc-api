# Acme Alarm Inc (API)

It's a node / express API for Acme Alarm Inc.

I can't link to the demo because you lot would use it to spam your friends.

It lets you set alarms. When the alarms go off, it calls a phone number and plays them a Rick Astley song.

There's [a front end that goes with this](https://github.com/fakedarren/acme-alarm-inc) too.


## Installing and running

- `npm install`
- Copy `.env.sample` to `.env` (and update as appropriate)
- You need some Twilio details to run this
- You need a Postgres database to run this
- `npm start`
- `npm run worker` runs the task that makes the calls. You can use cron to run this every minute or so?
