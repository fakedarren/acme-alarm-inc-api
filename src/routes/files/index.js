import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/:filename', async (req, res) => {
  const { filename } = req.params;
  const filepath = `${__dirname}/../../files/${filename}`;

  const stat = fs.statSync(filepath);

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size,
  });

  fs.createReadStream(filepath).pipe(res);
});

export default router;
