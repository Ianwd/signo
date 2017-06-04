const express = require('express');
const app = express();
const es = require('./es');

app.get('/search/:input', (req, res) => {
  const body = {
    size: 5,
    from: 0,
    _source: {
      excludes: [
        'content',
      ],
    },
    query: {
      multi_match: {
        query: req.params.input,
        fields: ['title', 'description', 'keywords', 'content'],
        minimum_should_match: 3,
        fuzziness: 2,
      },
    },
  };

  es.search('website', body).
  then((results) => {
    res.json(results.hits.hits);
  }).
  catch(console.error);
});

module.exports = app;
