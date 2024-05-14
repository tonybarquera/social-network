const jwt = require('jsonwebtoken');

const config = require('../config');
const secret = config.jwt.secret;
const err = require('../utils/error');

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);
    
    if(decoded.id === owner) {
      console.log(decoded);
    } else {
      throw err('No puedes editar', 401);
    }
  }
}

function getToken(authorization) {
  if(!authorization) {
    throw new Error('No viene token');
  } 

  if(authorization.indexOf('Bearer ') === -1) {
    throw new Error('Formato invalido');
  }

  let token = authorization.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
}

module.exports = {
  sign,
  check
}