import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB25YoxImclYftH8OzJDHM-Dz-QW7cMn9I",
    authDomain: "proyectointegrador-b0c44.firebaseapp.com",
    projectId: "proyectointegrador-b0c44",
    storageBucket: "proyectointegrador-b0c44.appspot.com",
    messagingSenderId: "760016961183",
    appId: "1:760016961183:web:6e5c019c03bac0537c6caa"
  };

  app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();