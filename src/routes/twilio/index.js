import express from 'express';
import twilio from 'twilio';

const VoiceResponse = twilio.twiml.VoiceResponse;

const router = express.Router();

router.all('/', async (req, res) => {
  const xml = new VoiceResponse();
  xml.play(
    {
      loop: 1,
    },
    `https://${req.host}/files/rickroll.mp3`,
  );
  res.send(xml.toString());
});

export default router;
