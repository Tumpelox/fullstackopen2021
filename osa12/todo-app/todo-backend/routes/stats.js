const express = require('express');
const { getAsync } = require('../redis')
const router = express.Router();

router.get('/', async (req, res) => {
  const stats = await getAsync('added_todos') || 0
  res.send({
    stats
  });
});

module.exports = router;
