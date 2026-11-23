import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJLsSurztcgvionY9MExhIj-kpfK4xPr8",
  authDomain: "biblioteca-digital-27318.firebaseapp.com",
  projectId: "biblioteca-digital-27318",
  storageBucket: "biblioteca-digital-27318.firebasestorage.app",
  messagingSenderId: "1072487264947",
  appId: "1:1072487264947:web:3d26aa8390fc8c004bb6c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db};