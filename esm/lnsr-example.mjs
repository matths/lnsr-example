import {queue, get, post, useFilter, filters} from 'lnsr/index.mjs';
import {showUser, saveUser} from './users.mjs';

export default queue(
  useFilter(filters.method("post"), (req, res, next) => { console.log('POST Request'); next(); }),
  useFilter(filters.method("get"), (req, res, next) => { console.log('GET Request'); next(); }),
  useFilter(filters.path("/welcome/:name"), (req, res, next) => res.end('Welcome '+req.params.name)),
  get('/user/:user', showUser),
  post('/user/:user', queue(
    saveUser,
    showUser
  )),
  useFilter(filters.simplePath("error"), (req, res, next) => next('throws an error.')),
  useFilter(filters.simplePath("secret"), (req, res, next) => res.end('keep out.')),
  (req, res, next) => res.end('have fun.')
)
