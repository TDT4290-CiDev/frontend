import axios from 'axios';
import API_URL from '../config';

const instance = axios.create({ baseURL: API_URL });

export function get(url) {
  return instance.get(`${url}`);
}

export function post(url, form) {
  return instance.post(`${url}`, form);
}

export function put(url, form) {
  return instance.put(`${url}`, form);
}
