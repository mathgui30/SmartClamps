import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = { 
    apiKey: "AIzaSyAxdPHSnBVV5idYyM7bQ94kfi7SVufqVtc",
    authDomain: "smart-43b09.firebaseapp.com",
    databaseURL: "https://smart-43b09-default-rtdb.firebaseio.com",
    projectId: "smart-43b09",
    storageBucket: "smart-43b09.appspot.com",
    messagingSenderId: "792178265446",
    appId: "1:792178265446:web:f365a5ef136f2eb9254ca7"
}



const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore(app);

export { db, auth };