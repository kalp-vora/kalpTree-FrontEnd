import ActionTypes from "../utils/ActionTypes";

const InitialAuthState = {
  userId: null,
  token: null,
  role: null,
  authenticated: false,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case ActionTypes.SET_AUTHENTICATED:
      return { ...state, authenticated: action.payload };
    case ActionTypes.SET_ROLE:
      return { ...state, role: action.payload };
    case ActionTypes.SET_USERID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};

export { AuthReducer, InitialAuthState };
