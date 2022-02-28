import axios from 'axios'
import { NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS } from '../constants/noteConstants'

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    })

    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    const { data } = await axios.get('api/notes', config)

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data
    })

  } catch(error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message : error.response.message

    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message
    })
  }
}

export const createNoteAction = (title, content, category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_CREATE_REQUEST
    })

    const { userLogin: {userInfo} } = getState() 

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      }
    }
    const { data } = await axios.post('api/notes/create', { title, content, category }, config)

    dispatch({
      type: NOTES_CREATE_SUCCESS,
      payload: data
    })

  } catch(error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message : error.response.message

    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message
    })
  } 
}