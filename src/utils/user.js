import users from "../data/users.json";
class User {
  #users;

  constructor(users) {
    this.#users = users;
  }

  get getAllUsersEmail() {
    return this.#users.map(({ email }) => email);
  }

  isLoginValid({ email, password }) {
    return !!this.#users.find(
      (user) => user.email === email && user.password === password
    );
  }

  getUserInfo(inputEmail) {
    const foundUser = this.#users.find(({ email }) => inputEmail === email);
    if (!foundUser) return null;
    const { password, ...rest } = foundUser;
    return rest;
  }
}

const userService = new User(users);

export default userService;
