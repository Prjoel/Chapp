function formatMsg(msg) {
  let date = (new Date()).getTime().toString();
  return {
    ...msg,
    id: msg.author.id + date
  }
}

module.exports = {formatMsg};