const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

if (!client.get('visits')) {
  console.log('setting default value for visits key');
  client.set('visits', 0);
}

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    console.log(`Visits currently set to ${visits}`);
    console.log('Incrementing...');
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
