const { User } = require('../db/models');

class UserService {

  static async saveUser(user) {
    try {
      await User.create(user);
      console.log('User added!')
    } catch (e) {
      console.log('Oh no! something really bad happened x0 saveuser(user)', e)
    }
  }

  static async getUserByEmail(userEmail) {
    try {
      let user = await User.findOne({
        where: {
          email: userEmail
        }
      });
      console.log('User retrieved!')
      return user
    } catch (e) {
      console.log('Oh no! something really bad happened x0 getuser(userId)', e)
    }
  }

  static async getUserById(id) {
    try {
      let user = await User.findByPk(id);
      console.log('User retrieved!')
      return user
    } catch (e) {
      console.log('Oh no! something really bad happened x0 getuser(userId)', e)
    }
  }

  static async getAllusers() {
    try {
      let users = await User.findAll();
      console.log('Users retrieved!')
      return users
    } catch (e) {
      console.log('Oh no! something really bad happened x0 getAllusers()', e)
    }
  }

  static async deleteuser(userId) {
    try {
      await User.destroy({
        where: {
          id: userId
        }
      })
      console.log('Users deleted!')
      return 1
    } catch (e) {
      console.log('Oh no! something really bad happened xD deleteuser(userId)', e)
    }
  }

  //static async deleteAllusers(user)

}

module.exports = UserService;