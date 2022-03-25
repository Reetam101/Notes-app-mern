import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, 
  USER_REGISTRATION_FAIL, 
  USER_REGISTRATION_REQUEST, 
  USER_REGISTRATION_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS, } from "../constants/userConstants"
// import { toast } from 'react-toastify'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    const { data } = await axios.post('/api/users/login', {
      email, password
    }, config)

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  catch(err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,

    })
 }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password, image) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTRATION_REQUEST })

    const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  const { data } = await axios.post('/api/users/', {
    name, image, email, password
  }, config)  

  dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data })

  localStorage.setItem('userInfo', JSON.stringify(data))
  } catch(error) {
    dispatch({ type: USER_REGISTRATION_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    // setError(error.response.data.message)
    // setLoading(false)
    // setTimeout(() => {
    //   setError(false)
    // }, 3000)
  }
}

export const updateProfile = (user) => async(dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post("/api/users/profile", user, config)
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem("userInfo", JSON.stringify(data))

  } catch(err) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    })
  }
}