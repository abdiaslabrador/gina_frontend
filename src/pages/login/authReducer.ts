import authTypes from "./authTypes";

const authReducer = (state: any = {}, action : any = {}) => {
    switch (action.type) {
      case authTypes.GET_USER:
        return {
          ...state,
          user: action.playload.user,
          token:action.playload.token,
          mensaje:""
        };
        case authTypes.LOGIN_SUCCESS:
        return {
          ...state,
          token:action.playload,
          mensaje: "",
        };
        case authTypes.LOGIN_ERROR:
          localStorage.removeItem("token")
        return {
          ...state,
          mensaje: action.playload,
          user:null,
          token:null
        };
        case authTypes.LOG_OUT:
          localStorage.removeItem("token")
        return {
          ...state,
          mensaje: "",
          user:null,
          token:null
        };
      default:
        return state;
    }
  };

  export default authReducer