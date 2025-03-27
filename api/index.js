import axios from 'axios';
//https://rucqr-backend.vercel.app/
//http://localhost:7700
//http://170.64.185.141/
const api = axios.create({baseURL: 'https://backendcms.vercel.app',});

export const postQuestion = (data) => api.post('/api/surveys', data);