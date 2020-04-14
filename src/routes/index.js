import express from 'express';

import alarms from './alarms';
import files from './files';
import twilio from './twilio';

const router = express.Router();

router.use('/alarms', alarms);
router.use('/files', files);
router.use('/twilio', twilio);

module.exports = router;
