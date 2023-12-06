const URL_VALIDATE = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;
const SUCCESSFUL_ANSWER = 201;
const allowedCors = [
  'localhost:3000',
  'localhost:3001',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://sofia.fr.nomoredomainsmonster.ru',
  'https://sofia.fr.nomoredomainsmonster.ru',
  'http://api.sofia.fr.nomoredomainsmonster.ru',
  'https://sofia.fr.nomoredomainsmonster.ru',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  URL_VALIDATE, SUCCESSFUL_ANSWER, allowedCors, DEFAULT_ALLOWED_METHODS,
};
