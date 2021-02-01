import { getAPI, postAPI, putAPI, deleteAPI } from "./customFetch";

const requests = {
  path: 'http://localhost:2021',

  async checkForSession() {
    const path = this.path;
    try {
      const userFetched = await getAPI(path);
      console.log('userFetched ', userFetched);
      return userFetched;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  async signup(user) {
    const path = this.path + '/signup';
    try {
      await postAPI(path, user);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  async login(user) {
    const path = this.path + '/login';
    try {
      await postAPI(path, user)
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  async editUserInfo(user) {
    const path = this.path + '/user';
    try {
      const response = await putAPI(path, user)
      return response;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  async deleteUser() {
    const path = this.path + '/user';
    try {
      const response = await deleteAPI(path);
      return response;
    } catch (e) {
      console.error(e);
      return false;
    }

  }
};

export default requests