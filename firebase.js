// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
 



  apiKey: "AIzaSyDEaNYDq10yxZLYnb5iLJ2Q5P79O9JspRA",
  authDomain: "covid-vaccination-6eeca.firebaseapp.com",
  projectId: "covid-vaccination-6eeca",
  storageBucket: "covid-vaccination-6eeca.appspot.com",
  messagingSenderId: "556241219309",
  appId: "1:556241219309:web:7009c9cb7851585ccca6e4",
  measurementId: "G-H0YC6H8SKH"
  
  // appId: "1:534427151061:web:7d21e1c3db4f24c751d05c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);

export default app;




////////////////



