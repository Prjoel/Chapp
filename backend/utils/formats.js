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
/**
 *   Returns an array with the method properties of a given object.
 * @param {*} obj 
 */
const getMethods = (obj) => {
  let properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj)))
  return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}


module.exports = { formatMsg, validateUser };