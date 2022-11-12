const SessionStorage = {
  setUserSession: (userId, token, role, authenticated) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("authenticated", authenticated);
  },
  getUserSession: () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const role = sessionStorage.getItem("role");
    const authenticated = sessionStorage.getItem("authenticated");
    return { token, userId, role, authenticated };
  },
  clearUserSession: () => {
    sessionStorage.clear();
  },
};
export default SessionStorage;
