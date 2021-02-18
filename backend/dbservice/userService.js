const { User } = require('../db/models');

class UserService {

  static async saveUser(user) {
    try {
      await User.create(user);
    } catch (e) {
      console.error(e)
    }
  }

  static async getUserByEmail(userEmail) {
    try {
      let user = await User.findOne({
        where: {
          email: userEmail
        }
      });
      return user
    } catch (e) {
      console.error(e)
      return 0;
    }
  }

  static async getUserById(id) {
    try {
      let user = await User.findByPk(id);
      return user
    } catch (e) {
      console.error(e)
    }
  }

  static async getAllusers() {
    try {
      let users = await User.findAll();
      return users
    } catch (e) {
      console.error(e)
    }
  }
  /**
   * 
   * @param {obj} update The object with the properties to update. 
   * @param {number} userId The PK (id number) of the user to update.
   * @param {string} userEmail The current registered email of the user to update.
   */
  static async updateUser(update, userId, userEmail) {
    const userFound = await this.getUserByEmail(update.email);
    const hasTheEmailChanged = userEmail === update.email;
    if (userFound && !hasTheEmailChanged) return new Error('This Email is already registered. Please try with a different one.')
    try {
      const [numberOfAffectedRows, affectedRows] = await User.update(update, {
        where: { id: userId },
        returning: true, // needed for affectedRows to be populated
        plain: true // makes sure that the returned instances are just plain objects
      });
      return 1;
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  static async updatePassword(userId, newPassword) {
    try {
      const [numberOfAffectedRows, affectedRows] = await User.update({ password: newPassword }, {
        where: { id: userId },
        returning: true, // needed for affectedRows to be populated
        plain: true // makes sure that the returned instances are just plain objects
      });
      return 1;
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  static async deleteUser(userId) {
    try {
      await User.destroy({
        where: {
          id: userId
        }
      });
      return 1
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
}

module.exports = UserService;