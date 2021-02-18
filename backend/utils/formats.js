function formatMsg(msg) {
  let date = (new Date()).getTime().toString();
  return {
    ...msg,
    id: msg.author.id + date
  }
}

function validateUser(user) {
  const validUsername = typeof (user.username) === 'string' && user.username.trim() !== '';
  const validEmail = typeof (user.email) === 'string' && user.email.trim() !== '';
  const validPassword = typeof (user.password) === 'string' && user.password.trim().length >= 3;

  return validEmail && validPassword && validUsername
}

module.exports = { formatMsg, validateUser };