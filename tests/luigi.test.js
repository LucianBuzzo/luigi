const T = require('horsea');
const mock = require('xhr-mock');
const fs = require('fs');
const luigi = require('../luigi');

const GET_RESPONSE = '<h1>FOO</h1><p><span id="subtitle">BAR</span></p>';
const GETJSON_RESPONSE = '{ "foo" : "bar" }';

// Read this test file to find the number of assertions
const thisFile = fs.readFileSync(__filename, 'utf8');
const total = (thisFile.match(/T\.assert/g) || []).length;

let run = 0;

const end = () => {
  run++;
  if (run >= total) {
    T.end();
  }
};

// replace the real XHR object with the mock XHR object
mock.setup();

/**
 * Mock for get() and getHTML()
 */
mock.get('http://localhost/get-test.html', function(req, res) {
  return res.body(GET_RESPONSE);
});

/**
 * Mock for getJSON()
 */
mock.get('http://localhost/getJSON-test.json', function(req, res) {
  return res.body(GETJSON_RESPONSE);
});

/**
 * Mock for post()
 */
mock.post('http://localhost/post-test', function(req, res) {
  let body = JSON.parse(req.body());
  if (body.hasOwnProperty('foo') && body.foo === 'bar') {
    return res.body('{ "success": true }');
  } else {
    return res.body('{ "success": false }');
  }
});


/**
 * get
 */
luigi.get('http://localhost/get-test.html', (responseText) => {
  T.assert(responseText === GET_RESPONSE, 'luigi.get() should return a string from the server');
  end();
});


/**
 * getJSON
 */
luigi.getJSON('http://localhost/getJSON-test.json', (response) => {
  T.assert(typeof response === 'object' && response.toString() === '[object Object]', 'luigi.getJSON() should return an object from the server');
  end();
});


/**
 * getHTML
 */
luigi.getHTML('http://localhost/get-test.html', 'subtitle', (responseText) => {
  T.assert(responseText === 'BAR', 'luigi.getHTML() should return the contents of the specified HTML element');
  end();
});


/**
 * post
 */
luigi.post('http://localhost/post-test', { foo: 'bar' }, (response) => {
  let parsed = JSON.parse(response);
  T.assert(parsed.hasOwnProperty('success') && parsed.success === true, 'luigi.post() should successfully send data to a server');
  end();
});

