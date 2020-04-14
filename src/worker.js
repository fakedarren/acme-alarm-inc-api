import dotenv from 'dotenv';
dotenv.config();

import moment from 'moment';
import twilio from 'twilio';

import db from './db';

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_OUTGOING_NUMBER,
  TWILIO_XML_ENDPOINT,
} = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

(async () => {
  const alarms = await db.query('SELECT * FROM alarms WHERE enabled = true');
  const calls = await db.oneOrNone('SELECT last_made FROM calls');

  const now = new Date().toISOString();

  const nowMoment = moment(now).set({ seconds: 59 });
  const thenMoment =
    calls && calls.last_made
      ? moment(calls.last_made).set({ seconds: 0 })
      : moment().subtract('5', 'minutes').set({ seconds: 0 });

  console.log(`From ${nowMoment.format('HH:mm:ss')}`);
  console.log(`To ${thenMoment.format('HH:mm:ss')}`);
  console.log(' ');

  alarms.forEach(async (alarm) => {
    const time = moment(alarm.time, 'HH:mm');

    if (time.isSameOrAfter(thenMoment) && time.isSameOrBefore(nowMoment)) {
      console.log(`Calling for ${alarm.time}`);

      try {
        const call = await client.calls.create({
          url: `${TWILIO_XML_ENDPOINT}`,
          to: alarm.number,
          from: TWILIO_OUTGOING_NUMBER,
        });
        console.log(`Made call ${call.sid}`);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    } else {
      console.log(`Ignoring ${alarm.time}`);
    }
  });

  await db.none('DELETE FROM calls');
  await db.none('INSERT INTO calls(last_made) VALUES ($1)', [
    nowMoment.set({ seconds: 0 }).toISOString(),
  ]);
})();
