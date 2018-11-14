/* eslint-disable no-undef */
const API_URL = NODE_ENV === 'production' ? `${window.location.origin}/api/` : 'http://localhost:8080/api/';

export default API_URL;
