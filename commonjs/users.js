const users = ['Bob'];

const showUser = (req, res, next) => {
  const user = req.params.user;
  if (users.includes(user)) {
    res.end('I remember you, welcome back '+ req.params.user);
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.end('I don\'t know you, please register ' + req.params.user
      +'<form method="POST" action="/user/'+req.params.user+'"><input type="submit" /></form>');
  }
}

const saveUser = (req, res, next) => users.push(req.params.user) && next();

module.exports = {
    showUser,
    saveUser
}
