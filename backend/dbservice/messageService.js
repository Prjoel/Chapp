const { Message } = require('../db/models');

class MsgService {

  static async saveMsg(msg) {
    try {
      await Message.create(msg);
      console.log('Message added!')
    } catch (e) {
      console.log('Oh no! something really bad happened x0 saveMsg(msg)', e)
    }
  }

  static async getMsg(msgId) {
    try {
      let msg = await Message.findAll({
        where: {
          id: msgId
        }
      });
      console.log('Message retrieved!')
      return msg
    } catch (e) {
      console.log('Oh no! something really bad happened x0 getMsg(msgId)', e)
    }
  }

  static async getAllMsgs() {
    try {
      let msgs = await Message.findAll();
      console.log('Messages retrieved!')
      return msgs
    } catch (e) {
      console.log('Oh no! something really bad happened x0 getAllMsgs()', e)
    }
  }

  static async deleteMsg(msgId) {
    try {
      await Message.destroy({
        where: {
          id: msgId
        }
      })
      console.log('Messages deleted!')
      return 1
    } catch (e) {
      console.log('Oh no! something really bad happened xD deleteMsg(msgId)', e)
    }
  }

  //static async deleteAllMsgs(msg)

}

module.exports = MsgService;