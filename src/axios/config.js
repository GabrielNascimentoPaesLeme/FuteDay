import axios from 'axios';

const blogAxios = axios.create({
  baseURL: '/api',
});

blogAxios.interceptors.request.use((config) => {
  config.headers['X-Auth-Token'] = '0a6264bd123a4f06b330ed8179d72cff';
  return config;
});


const axiosFootball = axios.create({
  baseURL: 'https://free-api-live-football-data.p.rapidapi.com'
})

axiosFootball.interceptors.request.use((config) => {
  config.headers['x-rapidapi-host'] = 'free-api-live-football-data.p.rapidapi.com';
  config.headers['x-rapidapi-Key'] = 'aebb4892b1mshb05698d4e7d51dfp14d228jsna1a15fd8fcd0'; 
  return config;
})


export default {blogAxios, axiosFootball};
