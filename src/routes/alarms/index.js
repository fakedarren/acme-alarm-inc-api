import express from 'express';
import moment from 'moment-timezone';

import db from '../../db';

const router = express.Router();

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await db.none('DELETE FROM alarms WHERE id=$1', [id]);

  const alarms = await db.query(
    'SELECT * FROM alarms ORDER BY time ASC, number ASC',
  );
  res.json(alarms);
});

router.get('/', async (req, res) => {
  const alarms = await db.query(
    'SELECT * FROM alarms ORDER BY time ASC, number ASC',
  );
  res.json(alarms);
});

router.patch('/:id', async (req, res) => {
  const { enabled } = req.body;
  const { id } = req.params;

  await db.none('UPDATE alarms SET enabled=$2 WHERE id=$1', [id, enabled]);

  const alarms = await db.query(
    'SELECT * FROM alarms ORDER BY time ASC, number ASC',
  );
  res.json(alarms);
});

router.post('/', async (req, res) => {
  const { time, number, enabled, timezone = 'America/Los_Angeles' } = req.body;
  const utc = moment.tz(time, 'HH:mm', timezone).utc().format('HH:mm');

  await db.none(
    'INSERT INTO alarms (time, number, enabled) VALUES($1, $2, $3)',
    [utc, number, enabled],
  );

  const alarms = await db.query(
    'SELECT * FROM alarms ORDER BY time ASC, number ASC',
  );
  res.json(alarms);
});

export default router;
