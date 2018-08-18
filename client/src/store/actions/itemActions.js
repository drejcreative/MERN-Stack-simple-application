import axios from 'axios';
import config from '../../config/config';
import {
  GET_ITEMS,
  ADD_ITEMS,
  DELETE_ITEMS,
  ITEMS_LOADING,
  ITEMS_LOADING_STOP
} from './types';

const url = config.url;

export const getItems = () => dispatch => {
  dispatch(setLoading());
  axios.get(`${url}api/items`)
    .then(res => 
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch(stopLoading());
      throw(error);
    })
}

export const deleteItem = (id) => dispatch => {
  dispatch(setLoading());
  axios.delete(`${url}api/items/${id}`)
    .then(() => 
      dispatch({
        type: DELETE_ITEMS,
        payload: id
      })
    )
    .catch(error => {
      dispatch(stopLoading());
      throw(error);
    })
}

export const addItem = (data) => dispatch => {
  dispatch(setLoading());
  
  return new Promise((resolve, reject) => {
    axios.post(`${url}api/items`, data)
    .then(res => {
      dispatch({
        type: ADD_ITEMS,
        payload: res.data
      });

      resolve();
    })
    .catch(err => {
      reject(err);
      dispatch(stopLoading());
      throw(err);
    })
  })
}

export const setLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}

export const stopLoading = () => {
  return {
    type: ITEMS_LOADING_STOP
  }
}