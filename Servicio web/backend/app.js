var express = require('express');
var session = require('express-session');
var Keycloak = require('keycloak-connect');
var cors = require('cors');

var app = express();

app.use(cors());

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: '5sKEhj5slcRMbrHHBUtLVDYC32EvOru6',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

app.get('/public',  function (req, res) {
  res.setHeader('content-type','text/plain');
  res.send('Public message!');
});

app.get('/protected', keycloak.protect(), function (req, res) {
  res.setHeader('content-type', 'text/plain');
  res.send('Access granted');
});

app.get('/secured', keycloak.protect('realm:myrole'), function (req, res) {
  res.setHeader('content-type', 'text/plain');
  res.send('Access granted');
});

app.get('/localizacion1', keycloak.enforcer(['localizacion1:view'], {
  resource_server_id: 'mybackend'
}), (req, res) => {
  return res.status(200).end('success');
});

app.get('/localizacion1/update', keycloak.enforcer(['localizacion1:update'], {
  resource_server_id: 'mybackend'
}), (req, res) => {
  return res.status(200).end('success');
});

app.get('/localizacion2', keycloak.enforcer(['localizacion2:view'], {
  resource_server_id: 'mybackend'
}), (req, res) => {
  return res.status(200).end('success');
});

app.get('/localizacion2/update', keycloak.enforcer(['localizacion2:update'], {
  resource_server_id: 'mybackend'
}), (req, res) => {
  return res.status(200).end('success');
});

app.get('/pruebarecurso', keycloak.enforcer(['pruebarecurso:view'], {
  resource_server_id: 'mybackend'
}), (req, res) => {
  return res.status(200).end('success');
});

app.get('/pruebarecurso/update', keycloak.enforcer(['pruebarecurso:update'], {
  resource_server_id: 'mybackend'
}), (req, res) => {
  return res.status(200).end('success');
});

app.listen(3000, function () {
  console.log('Started at port 3000');
});



