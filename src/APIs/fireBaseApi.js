import axios from 'axios';

const axios_firebaseApi = axios.create({baseURL: `https://react-beerapi.firebaseio.com/`});

export default axios_firebaseApi;