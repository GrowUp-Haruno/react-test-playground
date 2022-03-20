import { FirebaseOptions, initializeApp } from 'firebase/app';
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getStorage } from 'firebase/storage';
// import { getDatabase} from 'firebase/database';

// import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
// export const database = getDatabase(app)

// // 認証の永続性: session
// // 現在のセッションまたはタブでのみ状態が維持され、ユーザーが認証を受けたタブやウィンドウを閉じるとクリアされることを示します。
setPersistence(firebaseAuth, browserSessionPersistence);

// アバター画像のURL
export const avatarStorageUrl = process.env.REACT_APP_FIREBASE_AVATAR_STORAGE_URL;
