import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateCurrentUser,
  updateProfile,
  User,
} from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { onIdTokenChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { UserProfileType } from '../models/ChangeUserProfileType';
import { currentUserTyep } from '../types/currentUserTyep';
import { firebaseAuth } from './firebase';

/**
 * ユーザー情報を取得する
 */
export const useAuthentication = () => {
  const [currentUser, setCurrentUser] = useState<currentUserTyep | null>();

  useEffect(() => {
    const Unsubscribe = onIdTokenChanged(firebaseAuth, (user) => {
      console.log('ユーザーを取得');
      setCurrentUser(user);
    });

    return () => {
      Unsubscribe();
    };
  }, []);
  return { currentUser };
};

/**
 * Googleログイン
 */
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(firebaseAuth, googleProvider)
    .then(() => {
      console.log('認証成功');
    })
    .catch((error: FirebaseError) => {
      console.log(error.message);
    });
};

/**
 * 共通ログアウト
 */
export const logout = () => {
  signOut(firebaseAuth)
    .then(() => {
      console.log('logged out');
      document.location.reload();
    })
    .catch((error: FirebaseError) => {
      console.log(error.message);
    });
};

/**
 * ユーザープロファイル更新
 */
export const changeUserProfile = async (currentUser: User, userProfile: UserProfileType) => {
  try {
    // プロフィール更新
    await updateProfile(currentUser, {
      displayName: `${userProfile.displayName}`,
      photoURL: `${userProfile.photoURL}`,
    });

    await updateCurrentUser(firebaseAuth, firebaseAuth.currentUser);
  } catch (error) {
    throw error;
  }
};
