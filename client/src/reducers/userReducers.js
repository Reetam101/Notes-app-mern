import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
USER_REGISTRATION_FAIL, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_REQUEST
} from "../constants/userConstants"


export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: true, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      return { loading: true }
    case USER_REGISTRATION_SUCCESS:
      return { loading: true, userInfo: action.payload }
    case USER_REGISTRATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}