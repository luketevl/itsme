import firebase from 'firebase';
import * as config from './fire-env';

export default firebase.initializeApp({
  apiKey: config.APIKEY,
  authDomain: config.AUTHDOMAIN,
  databaseURL: config.DATABASEURL,
  storageBucket: config.STORAGEBUCKET,
  messagingSenderId: config.MESSAGINGSENDERID,
})

