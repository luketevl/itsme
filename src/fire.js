import firebase from 'firebase';
import * as config from './fire-env';

export default firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
})