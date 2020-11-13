const lnsr = require('lnsr'); 
const users = require('./users'); 

module.exports = lnsr.queue(
  lnsr.useFilter(lnsr.filters.method("post"), (req, res, next) => { console.log('POST Request'); next(); }),
  lnsr.useFilter(lnsr.filters.method("get"), (req, res, next) => { console.log('GET Request'); next(); }),
  lnsr.useFilter(lnsr.filters.path("/welcome/:name"), (req, res, next) => res.end('Welcome '+req.params.name)),
  lnsr.get('/user/:user', users.showUser),
  lnsr.post('/user/:user', lnsr.queue(
    users.saveUser,
    users.showUser
  )),
  lnsr.useFilter(lnsr.filters.simplePath("error"), (req, res, next) => next('throws an error.')),
  lnsr.useFilter(lnsr.filters.simplePath("secret"), (req, res, next) => res.end('keep out.')),
  (req, res, next) => res.end('have fun.')
);
