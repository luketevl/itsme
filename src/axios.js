import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://itsme-157.firebaseio.com/'
});

export default instance;