const fs = require('fs');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

const articlesRaw = fs.readFileSync('data.json');
const articles = JSON.parse(articlesRaw);

const initIndex = function initIndex(index, type, data) {
  let bulkBody = [];

  data.forEach((item) => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id,
      },
    });

    bulkBody.push(item);
  });

  client.bulk({body: bulkBody}).
  then((response) => {
    console.log('here');
    let errorCount = 0;

    response.items.forEach((item) => {
      if (item.index && item.index.error) {
        console.log(errorCount += 1, item.index.error);
      }
    });
    console.log(
      `Successfully indexed ${data.length - errorCount} out of ${data.length} items`
    );
  }).
  catch(console.err);
};

const testIndex = function testIndex() {
  const articlesRaw = fs.readFileSync('data.json');
  const articles = JSON.parse(articlesRaw);

  initIndex('website', 'article', articles);
};

// testIndex();

const search = function search(index, body) {
  return client.search({index: index, body: body});
};

const testSearch = function testSearch() {
  let body = {
    size: 20,
    from: 0,
    query: {
      multi_match: {
        query: req.params.input,
        fields: ['title', 'description', 'keywords', 'content'],
        minimum_should_match: 3,
        fuzziness: 2
      }
    }
  };

  search('website', body).
  then((results) => {
    if (results.hits.total > 0) {
      console.log('returned article titles:');
    }
    results.hits.hits.forEach((hit, index) => {
      console.log(`\t${body.from + ++index} - ${hit._source.title} (score: ${hit._score})`);
    });
  }).
  catch(console.error);
};

// testSearch();

const indices = function indices() {
  return client.cat.indices({v: true}).
  then(console.log).
  catch((err) => console.error(`Error connecting to the es client: ${err}`));
};

const testIndices = function testIndices() {
  console.log('elasticsearch indices information:');
  indices();
};

initIndex('website', 'article', articles);

module.exports = {
  initIndex,
  search,
  indices,
};
