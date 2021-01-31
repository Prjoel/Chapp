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
      return 0;
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
  /**
   * 
   * @param {obj} update The object with the properties to update. 
   * @param {number} userId The PK (id number) of the user to update.
   */
  static async updateUser(update, userId, userEmail) {
    const userFound = await this.getUserByEmail(update.email);
    const hasTheEmailChanged = userEmail === update.email;
    if(userFound && !hasTheEmailChanged) return new Error('This Email is already registered. Please try with a different one.')
    try {

      const [numberOfAffectedRows, affectedRows] = await User.update(update, {
        where: { id: userId },
        returning: true, // needed for affectedRows to be populated
        plain: true // makes sure that the returned instances are just plain objects
      });
      console.log(numberOfAffectedRows)
      console.log(affectedRows)
      return 1;
    } catch (e) {
      console.error(e);
      return 0;
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