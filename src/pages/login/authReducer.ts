import authTypes from "./authTypes";

const authReducer = (state: any = {}, action : any = {}) => {
    switch (action.type) {
      case authTypes.GET_USER:
        return {
          ...state,
          user: action.playload.user,
          token:action.playload.token,
          authenticated:true,
          mensaje:""
        };
        case authTypes.LOGIN_SUCCESS:
        return {
          ...state,
          token:action.playload,
          authenticated:true,
          mensaje: "",
        };
        case authTypes.LOGIN_ERROR:
        case authTypes.LOG_OUT:
          localStorage.removeItem("token")
        return {
          ...state,
          user:null,
          token:null,
          authenticated:null,
          mensaje: action.playload,
        };
      default:
        return state;
    }
  };

  export default authReducer