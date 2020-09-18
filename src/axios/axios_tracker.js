import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tracker-api-akn.herokuapp.com'
});

export { instance };