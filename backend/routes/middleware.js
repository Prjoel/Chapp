function isAuthorized(req, res, next) {
  const isIt = req.isAuthenticated();
  if (isIt) return next();
  return res.redirect('/login')
}

module.exports = { isAuthorized }