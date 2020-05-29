import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC0ULG_rsAQADCgItpEtm33Um5WMMCyYs8",
    authDomain: "fannanna-2b847.firebaseapp.com",
    databaseURL: "https://fannanna-2b847.firebaseio.com",
    projectId: "fannanna-2b847",
    storageBucket: "fannanna-2b847.appspot.com",
    messagingSenderId: "427248967134",
    appId: "1:427248967134:web:b0b2b052945d7ebec5914f",
    measurementId: "G-3F8ELH184D"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};

