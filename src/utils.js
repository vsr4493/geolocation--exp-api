const fetch = require('node-fetch');
const isProduction = process.env.NODE_ENV === 'production';

exports.asyncWrapper = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(error => {
        if (!isProduction) console.log(error);
        return next(error);
      });
  };
};

exports.fetch = async (...args) => {
  const result =  await fetch(...args);
  const contentType = result.headers.get("content-type");
  const content = contentType && contentType.indexOf("application/json") !== -1
    ? await result.json()
    : await result.text()
  if(!result.ok) {
    return Promise.reject(content);
  }
  return content;
}