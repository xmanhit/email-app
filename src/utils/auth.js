export const fakeAuthProvider = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
  email: JSON.parse(localStorage.getItem("email")),

  async signin(email) {
    await new Promise((r) => setTimeout(r, 500)); // fake delay

    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("isAuthenticated", JSON.stringify(true));

    fakeAuthProvider.isAuthenticated = JSON.parse(
      localStorage.getItem("isAuthenticated")
    );
    fakeAuthProvider.email = JSON.parse(localStorage.getItem("email"));
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay

    localStorage.removeItem("email");
    localStorage.removeItem("isAuthenticated");
    fakeAuthProvider.email = JSON.parse(localStorage.getItem("email"));
    fakeAuthProvider.isAuthenticated = JSON.parse(
      localStorage.getItem("isAuthenticated")
    );
  },
};
