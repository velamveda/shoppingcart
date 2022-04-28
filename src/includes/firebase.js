import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs,addDoc } from 'firebase/firestore'
import { getStorage, ref as storeref, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCfHqZm8R3Xxpjy7CYKj1GUq_xRqCCfQfM",
    authDomain: "mobile-cart-f1c26.firebaseapp.com",
    projectId: "mobile-cart-f1c26",
    storageBucket: "mobile-cart-f1c26.appspot.com",
    messagingSenderId: "250335656414",
    appId: "1:250335656414:web:a3449a1378e51d17f3854f"
}

// init firebase
initializeApp(firebaseConfig)

// init firebase auth
const auth = getAuth()
const db = getFirestore()
const colRef = collection(db, 'mobilecart')
const storeCart= collection(db, 'cart')
const storage = getStorage()

export { auth, db, colRef, storage, getDocs, storeref, getDownloadURL, addDoc, storeCart}