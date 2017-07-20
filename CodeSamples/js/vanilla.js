/**
* escapeHtml
* @param {String} str A string with potential html tokens
* @return {String} Escaped HTML string according to OWASP recomendation
*/
const ESCAPE_HTML_MAP = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '/': '&#x2F;', '\'': '&#x27;'};
const escapeHtml = (str = '') => String(str).replace(/[&<>"'/]/g, (char) => ESCAPE_HTML_MAP[char]);


/**
* stripTags (browser only)
* @param {String} str A string with potential html tokens
* @return {String} String with no tags
*/
const STRIP_TAGS_NODE = document.createElement('div');
const stripTags = (str = '') => {
  STRIP_TAGS_NODE.innerHTML = str;
  return STRIP_TAGS_NODE.textContent;
};

/**
* fetchy
* @param {Object} config Configuration of request
* @param {String} config.url URL to request
* @param {String} config.method The HTTP method to use, such as "GET", "POST"
* @param {Function} config.onload Callback to fire when request is completed
* @param {Function} config.onerror Callback to fire when request fails
* @param {Object} [config.headers] Key-value object of valid HTTP headers, such as {Accept: 'application/json'}
* @param {String|null|Blob|FormData} config.data Data to send to server
* @return {XMLHttpRequest} Access to ajax interface
*/
const fetchy = ({
  url,
  data = null,
  headers = {},
  method = 'GET',
  onload = Function.prototype,
  onerror = Function.prototype
}) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => onload(xhr.responseText, xhr);
  xhr.onerror = () => onerror(xhr);
  xhr.open(method, url, true); //Async
  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key]);
  });
  xhr.send(data);
  return xhr;
};

/**
* debounce
* @param {Function} callback The function to debounce
* @param {Number} ms The number of milliseconds to delay
* @return {Function} The new debounced function
*/
const debounce = (callback, ms) => {
  let timer;
  return function(...args){
    const self = this;
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(self, args), ms);
  };
};

/**
* parseJSON
* @param {String} json The string to parse as JSON
* @param {Function} onError Function to call on errors
* @return {Object} The Object corresponding to the given JSON string
*/
const parseJSON = (json, onError = Function.prototype) => {
  try{
    return JSON.parse(json);
  }catch(err){
    onError(err);
  }
};

/**
* queryAll
* @param {String} selector String containing one or more CSS selectors separated by commas
* @param {Node} [node] A DOM Element or Document to use as context
* @return {Array} A array of matched elements found in context
*/
const queryAll = (selector, node = document) =>
  Array.prototype.slice.call(node.querySelectorAll(selector));

  /**
* smoothScroll
* @param {Node|Number} node A DOM Element or y-position to scroll to
* @returns {undefined}
*/
const smoothScroll = (node = 0) => {
  let nowY = window.pageYOffset;
  const endY = typeof node === 'number'? node : node.getBoundingClientRect().top + nowY;
  const move = () => {
    if(Math.abs(endY - nowY) > 5){
      nowY+= (endY - nowY) / 5;
      window.scrollTo(0, Math.round(nowY));
      window.requestAnimationFrame(move);
    }else{
      window.scrollTo(0, endY);
    }
  };
  move();
};

/**
* isNumberic
* @param {String|Number} number The value to check
* @return {Boolean} Returns true if value is numeric (can be converted to valid number), else false
*/
const isNumeric = (number) => Number(number) === parseFloat(number, 10); //Use both Number and parseFloat to correctly check both null, 0 and '123abc'

/**
* isObject
* @param {String|Number} object The value to check
* @return {Boolean} Returns true if value is isObject, else false
*/
const isObject = (object) => Boolean(object && object === Object(object));