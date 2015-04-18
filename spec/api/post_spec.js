var frisby = require('frisby');
var baseURL = 'http://localhost:1337/'; // just replace if on live server

frisby.create('Status 200 for GET /api/v1/posts is returned')
    .get(baseURL + 'api/v1/posts')
    .expectStatus(200)
    .toss();

frisby.create('Status 200 for GET /api/v1/posts/:id')
    .get(baseURL + 'api/v1/posts/5525f1e3f6a7f3a00b234a09')
    .expectStatus(200)
    .expectJSON({ 'author': 'jaypax' })
    .toss();

