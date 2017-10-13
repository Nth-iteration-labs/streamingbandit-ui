import HttpError from "../core/HttpError";
import store from "../stores/store";

const fetchJson = (url, options = {}) => {
  // start ugly hack - need to find out why old url can "stick" here

  // console.log("fetchJson"+url)
  // console.log("fetchJsonstore"+store.serverurl)

  let parser = document.createElement("a");
  parser.href = url;
  url = store.serverurl + parser.pathname + parser.search + parser.hash;

  // end ugly hack

  const requestHeaders =
    options.headers ||
    new Headers({
      Accept: "application/vnd.api+json"
    });
  if (!(options && options.body && options.body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/vnd.api+json");
  }
  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set("Authorization", options.user.token);
  }
  options.credentials = "include";
  return fetch(url, { ...options, headers: requestHeaders || {} })
    .then(response =>
      response.text().then(text => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text
      }))
    )
    .then(({ status, statusText, headers, body }) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        // not json, no big deal
      }
      if (status < 200 || status >= 300) {
        return Promise.reject(
          new HttpError((json && json.message) || statusText, status)
        );
      }
      return { status, headers, body, json };
    });
};

export const jsonApiHttpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/vnd.api+json" });
  }
  options.headers.set("Content-Type", "application/vnd.api+json");
  return fetchJson(url, options);
};

const isValidObject = value => {
  if (!value) {
    return false;
  }

  const isArray = Array.isArray(value);
  const isBuffer = Buffer.isBuffer(value);
  const isObject = Object.prototype.toString.call(value) === "[object Object]";
  const hasKeys = !!Object.keys(value).length;

  return !isArray && !isBuffer && isObject && hasKeys;
};

export const flattenObject = (value, path = []) => {
  if (isValidObject(value)) {
    return Object.assign(
      {},
      ...Object.keys(value).map(key =>
        flattenObject(value[key], path.concat([key]))
      )
    );
  } else {
    return path.length ? { [path.join(".")]: value } : value;
  }
};
