# luigi
Micro library for making AJAX requests - 857 bytes minified

See a demo here https://lucianbuzzo.github.io/luigi/.

# Usage

Simple use a script tag to load luigi at the bottom of your pages `<body>` tag.

``` html
<script src="luigi.js"></script>
```

# Documentation


* [luigi](#module_luigi)
    * [.get(url, callback)](#module_luigi.get) ⇒ <code>Object</code>
    * [.getJSON(url, callback)](#module_luigi.getJSON) ⇒ <code>Object</code>
    * [.getHTML(url, elementId, callback)](#module_luigi.getHTML) ⇒ <code>Object</code>
    * [.post(url, data, callback)](#module_luigi.post) ⇒ <code>Object</code>

<a name="module_luigi.get"></a>

### luigi.get(url, callback) ⇒ <code>Object</code>
**Kind**: static method of <code>[luigi](#module_luigi)</code>  
**Summary**: Sends a GET request to a url  
**Returns**: <code>Object</code> - - An XMLHttpRequest object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to send a request to |
| callback | <code>function</code> | callback(responseText) |

**Example**  
```js
luigi.get('/example.html', function callback(responseText) {  console.log(responseText);});
```
<a name="module_luigi.getJSON"></a>

### luigi.getJSON(url, callback) ⇒ <code>Object</code>
Sends a GET request to a url that serves JSON. Data is parsed beforebeing passed to the callback function.

**Kind**: static method of <code>[luigi](#module_luigi)</code>  
**Summary**: Sends a GET request to a url that serves JSON.  
**Returns**: <code>Object</code> - - An XMLHttpRequest object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to send a request to |
| callback | <code>function</code> | callback(responseData) |

**Example**  
```js
luigi.getJSON('/example.html', function callback(responseData) {  console.log(responseData);});
```
<a name="module_luigi.getHTML"></a>

### luigi.getHTML(url, elementId, callback) ⇒ <code>Object</code>
**Kind**: static method of <code>[luigi](#module_luigi)</code>  
**Summary**: Retrieves an HTML element from a page loaded with AJAX  
**Returns**: <code>Object</code> - - An XMLHttpRequest object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to send a request to |
| elementId | <code>String</code> | The id of the element to search for |
| callback | <code>function</code> | function called with the HTML element if present, else an empty string. |

**Example**  
```js
var html = '<p><h1>FOO</h1><span id="subtitle">BAR</span></p>';var element = pickHTML(html, 'subtitle');console.log(element); // --> '<span id="subtitle">BAR</span>'
```
<a name="module_luigi.post"></a>

### luigi.post(url, data, callback) ⇒ <code>Object</code>
**Kind**: static method of <code>[luigi](#module_luigi)</code>  
**Summary**: Sends a post request via AJAX  
**Returns**: <code>Object</code> - - An XMLHttpRequest object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to send a request to |
| data | <code>Object</code> | The data to send as the request body |
| callback | <code>function</code> | function called with the HTML element if present, else an empty string. |

**Example**  
```js
luigi.post('/example-endpoint', { foo: 'bar' }, function(responseText) {  console.log(responseText);});
```

