import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dd6719deb557.ngrok.io'
});

export { instance };