import app from 'firebase/app';
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDjDfc6eNFni6foDUuAoKtLTe3xG8J-MTM",
  authDomain: "proyecto-integrador-c54c6.firebaseapp.com",
  projectId: "proyecto-integrador-c54c6",
  storageBucket: "proyecto-integrador-c54c6.appspot.com",
  messagingSenderId: "968489522977",
  appId: "1:968489522977:web:711ea961a19d205e221060",
  measurementId: "G-089WMN0LMT"
};
  app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();