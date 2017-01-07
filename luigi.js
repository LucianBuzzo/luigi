!(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.luigi = factory();
  }
}(this, function factory() {
  /**
   * @module luigi
   */

  /**
   * @summary Sends a GET request to a url
   * @memberof module:luigi
   * @function
   * @public
   *
   * @param {String} url - The url to send a request to
   * @param {Function} callback - callback(responseText)
   *
   * @return {Object} - An XMLHttpRequest object.
   *
   * @example
   *
   * luigi.get('/example.html', function callback(responseText) {
   *   console.log(responseText);
   * });
   */
  function get(url, callback) {
    var req = new XMLHttpRequest();
    req.onload = function() {
      callback(this.responseText);
    };
    req.open('GET', url, true);
    req.send();
    return req;
  }


  /**
   * @summary Sends a GET request to a url that serves JSON.
   * @memberof module:luigi
   * @function
   * @public
   *
   * @desc Sends a GET request to a url that serves JSON. Data is parsed before
   * being passed to the callback function.
   *
   * @param {String} url - The url to send a request to
   * @param {Function} callback - callback(responseData)
   *
   * @return {Object} - An XMLHttpRequest object.
   *
   * @example
   *
   * luigi.getJSON('/example.html', function callback(responseData) {
   *   console.log(responseData);
   * });
   */
  function getJSON(url, callback) {
    return get(url, function getJSONCallback(data) {
      callback(JSON.parse(data));
    });
  }


  /**
   * @summary Retrieves a single element from a string of HTML
   * @function
   * @private
   *
   * @param {String} html - The HTML to search
   * @param {String} elementId - The id of the element to search for
   *
   * @return {String} - The HTML element if present, else an empty string.
   *
   * @example
   *
   * var html = '<p><h1>FOO</h1><span id="subtitle">BAR</span></p>';
   * var element = pickHTML(html, 'subtitle');
   * console.log(element); // --> '<span id="subtitle">BAR</span>'
   */
  function pickHTML(html, elementId) {
    var regexp = new RegExp("<(?!\!)\\s*([^\\s>]+)[^>]*\\s+id\\=[\"\']" + elementId + "[\"\'][^>]*>", "i");
    var res = regexp.exec(html);
    return res ? (new RegExp('(?:(?:.(?!<\\s*' + res[1] + '[^>]*[>]))*.?<\\s*' + res[1] + '[^>]*[>](?:.(?!<\\s*\/\\s*' + res[1] + '\\s*>))*.?<\\s*\/\\s*' + res[1] + '\\s*>)*(?:.(?!<\\s*\/\\s*' + res[1] + '\\s*>))*.?', 'i')).exec(html.slice(html.indexOf(res[0]) + res[0].length))[0] || '' : '';
  }


  /**
   * @summary Retrieves the contents of an HTML element from a page loaded with AJAX
   * @memberof module:luigi
   * @function
   * @public
   *
   * @param {String} url - The url to send a request to
   * @param {String} elementId - The id of the element to search for
   * @param {Function} callback - function called with the content of the HTML element if present, else an empty string.
   *
   * @return {Object} - An XMLHttpRequest object.
   *
   * @example
   *
   * var html = '<p><h1>FOO</h1><span id="subtitle">BAR</span></p>';
   * var element = pickHTML(html, 'subtitle');
   * console.log(element); // --> 'BAR'
   */
  function getHTML(url, elementId, callback) {
    return get(url, function getHTMLCallback(data) {
      callback(pickHTML(data, elementId));
    });
  }


  /**
   * @summary Sends a post request via AJAX
   * @memberof module:luigi
   * @function
   * @public
   *
   * @param {String} url - The url to send a request to
   * @param {Object} data - The data to send as the request body
   * @param {Function} callback - function called with response test from the server
   *
   * @return {Object} - An XMLHttpRequest object.
   *
   * @example
   * luigi.post('/example-endpoint', { foo: 'bar' }, function(responseText) {
   *   console.log(responseText);
   * });
   */
  function post(url, data, callback) {
    var req = new XMLHttpRequest();
    req.onload = function() {
      callback(req.responseText);
    };
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application\/json');
    req.send(JSON.stringify(data));
    return req;
  }

  var luigi = get;
  luigi.get = get;
  luigi.getJSON = getJSON;
  luigi.getHTML = getHTML;
  luigi.post = post;

  return luigi;
}));
