function isAuthorized(req, res, next) {
  const isIt = req.isAuthenticated()
  if (isIt) return next();
  return res.sendStatus(302);
}

module.exports = { isAuthorized }