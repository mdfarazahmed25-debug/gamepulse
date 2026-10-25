import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCEOWBXDkWanVnOI1tKunCdRHIteionrn4",
  authDomain: "gamepulse-c13f8.firebaseapp.com",
  projectId: "gamepulse-c13f8",
  storageBucket: "gamepulse-c13f8.firebasestorage.app",
  messagingSenderId: "757391922203",
  appId: "1:757391922203:web:c33379f03e83039f0594be",
  databaseURL: "https://gamepulse-c13f8-default-rtdb.firebaseio.com"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const rtdb = getDatabase(app)
export default app
