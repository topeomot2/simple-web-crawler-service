const validator = require('validator');
const express = require('express');
const { getContent } = require('../services/crawler');
const router = express.Router();


router.get('/', async function (req, res, next) {
  if (!req.query || !req.query.url 
    || !validator.isURL(req.query.url, { require_host: true, require_protocol: true })) {
    return res.status(400).send('send absolute url with protocol included')
  }

  let data = await getContent(req.query.url)
  if (!data) {
    return res.sendStatus(404)
  }
  res.send({ data });
});

module.exports = router;
