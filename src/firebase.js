// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBAS2n4GQiIyAueVHuUiUxP9Bo8Gf0-Xag",
    authDomain: "whatsapp-clone-4be9c.firebaseapp.com",
    projectId: "whatsapp-clone-4be9c",
    storageBucket: "whatsapp-clone-4be9c.appspot.com",
    messagingSenderId: "710737270384",
    appId: "1:710737270384:web:f5c391a98050fdb312c6b5",
    measurementId: "G-YMK6V42CV7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;