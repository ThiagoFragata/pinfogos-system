import axios from 'axios'

export const api = axios.create({
  baseURL: '/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
