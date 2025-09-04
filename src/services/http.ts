// src\services\http.ts

import axios from 'axios';

export const API_URL = 'https://dummyjson.com';
const http = axios.create({ baseURL: API_URL });

export default http;
