import axios from 'axios';

const blogAxios = axios.create({
  baseURL: '/api',
});

blogAxios.interceptors.request.use((config) => {
  config.headers['X-Auth-Token'] = '0a6264bd123a4f06b330ed8179d72cff';
  return config;
});

export default blogAxios;
